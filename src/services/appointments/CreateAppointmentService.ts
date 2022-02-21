import { isBefore, format, parseISO, getTime } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { IStatusHistory } from '../../interfaces/statusHistory';
import Clients from '../../models/entities/Clients';
import CommodityTypes from '../../models/entities/CommodityTypes';
import validadeContract from '../../libs/validateContract';
import calculateGridIndex from '../../libs/calculateGridIndex';
import generateTimesNeeds from '../../libs/generateTimesNeeds';
import TeamsRepository from '../../repositories/TeamsRepository';
import ClientsRepository from '../../repositories/ClientsRepository';
import checkTimeAvailable from '../../libs/checkTimeAvailable';

import Appointments from '../../models/entities/Appointments';
import IAppointmentsRepository from '../../repositories/types/IAppointmentsRepository';

import BusyTimesRepository from '../../repositories/BusyTimesRepository';
import AppointmentsStatusRepository from '../../repositories/AppointmentsStatusRepository';

interface IRequest {
  contract_id: number;
  module: 'spawn_module' | 'loading_module';
  client_id: number;
  date: string;
  hour: string;
  commodity_types_id: number;
  amount: number;
  team_id: number;
  doc_bl?: string;
  doc_di?: string;
  doc_container?: string;
  obs?: string;
  userLogin: string;
}

interface ICustomAppointment extends Appointments {
  clientData?: Clients;
  commodityTypeData?: CommodityTypes;
  statusHistory: IStatusHistory;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    contract_id,
    module,
    client_id,
    date,
    hour,
    commodity_types_id,
    amount,
    team_id,
    doc_bl,
    doc_di,
    doc_container,
    obs,
    userLogin,
  }: IRequest): Promise<ICustomAppointment> {
    await validadeContract(contract_id);

    const parsedDate = parseISO(date);

    const parsedDateTime = parseISO(`${date} ${hour}`);

    // Verificar se é data que já passou
    if (isBefore(parsedDateTime, new Date())) {
      throw new Error('Data informada não permitida.');
    }

    // verificar se o time está habilitado;

    const teamsRepository = new TeamsRepository();

    const checkTeam = await teamsRepository.findById(team_id);
    if (!checkTeam) {
      throw new Error('Equipe informada não existe');
    }

    if (module === 'loading_module' && !checkTeam.loading_module) {
      throw new Error('Equipe informada não está habilitada para carregamento');
    } else if (module === 'spawn_module' && !checkTeam.spawn_module) {
      throw new Error('Equipe informada não está habilitada para desova');
    }

    // verificar se o cliente existe;

    const clientsRepository = new ClientsRepository();

    const checkClient = await clientsRepository.findById(client_id);
    if (!checkClient) {
      throw new Error('Cliente informado não existe!');
    }

    const { grids, commodityType } = await calculateGridIndex({
      amount,
      commodity_types_id,
    });

    const timesGridsNeeds = generateTimesNeeds(parsedDateTime, grids);

    const busyTimesRepository = new BusyTimesRepository();

    // Verificar se o horário está disponível
    const checkTime = await checkTimeAvailable({
      contract_id,
      module,
      parsedDate,
      team_id,
      timesGridsNeeds,
    });

    if (!checkTime.busyTimes.length) {
      throw new Error('Não foi possível gerar este agendamento.');
    }

    const lastCode = await this.appointmentsRepository.findLastCode(
      Number(contract_id),
      module,
      date,
    );
    const numberNextAppointment = !lastCode?.length
      ? 1
      : Number(lastCode[0].code.slice(lastCode[0].code.length - 2)) + 1;

    const code = `${
      module === 'loading_module' ? 'C' : 'D'
    }${contract_id}${format(parsedDateTime, 'ddMMyyyy')}${
      numberNextAppointment < 10
        ? `0${numberNextAppointment}`
        : numberNextAppointment
    }`;

    const appointmentsStatusRepository = new AppointmentsStatusRepository();

    const appointment = await this.appointmentsRepository.create({
      contract_id,
      module,
      client_id,
      date: parsedDateTime,
      commodity_types_id,
      amount,
      team_id,
      doc_bl,
      doc_di,
      doc_container,
      obs,
      status_id: 0,
      grid_index: grids,
      code,
    });
    if (checkTime.idBusyTimes) {
      const busyUpdated = await busyTimesRepository.update(
        checkTime.idBusyTimes,
        JSON.stringify(checkTime.busyTimes),
      );

      if (!busyUpdated) {
        throw new Error(
          'Erro ao tentar atualizar a lista de horários ocupados.',
        );
      }
    }

    const dateStatus = new Date();
    const status = [
      {
        status: 'scheduled',
        timestamp: getTime(dateStatus),
        date_formated: format(dateStatus, 'dd/MM/yyyy HH:mm'),
        user: userLogin,
      },
    ];

    const { status_history } = await appointmentsStatusRepository.create({
      appointment_id: appointment.id,
      code,
      contract_id,
      module,
      status_history: JSON.stringify(status),
    });

    return {
      ...appointment,
      clientData: checkClient,
      commodityTypeData: commodityType,
      statusHistory: JSON.parse(status_history),
    };
  }
}

export default CreateAppointmentService;
