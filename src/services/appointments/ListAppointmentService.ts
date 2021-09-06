import { parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from 'errors/AppError';
import Appointments from '../../models/entities/Appointments';

import IAppointmentsRepository from '../../repositories/types/IAppointmentsRepository';

import BusyTimesRepository from '../../repositories/BusyTimesRepository';
import TeamsRepository from '../../repositories/TeamsRepository';

interface IRequest {
  contract_id: number;
  module: string;
  date: string;
}

interface IResponse {
  [team: string]: Appointments[];
}

@injectable()
class ListAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    contract_id,
    module,
    date,
  }: IRequest): Promise<IResponse | undefined> {
    // Antes de fazer a busca das agendas verificar no Mongo se as hahs foram criadas

    const busyTimesRepository = new BusyTimesRepository();
    const teamsRepository = new TeamsRepository();

    const parsedDate = parseISO(date);

    const busyTimesHash = await busyTimesRepository.findByDate(
      contract_id,
      module,
      parsedDate,
    );

    const teamsEnebled = await teamsRepository.findEnebled(contract_id);
    if (teamsEnebled?.length) {
      teamsEnebled.forEach(async team => {
        const busyTimeFind = busyTimesHash?.find(
          time => time.team_id === team.id,
        );

        if (!busyTimeFind) {
          await busyTimesRepository.create({
            busy_times: JSON.stringify([]),
            module,
            contract_id,
            date: parsedDate,
            team_id: team.id,
          });
        }
      });
    } else {
      throw new AppError(
        'Não existe nenhuma equipe habilitada para este contrato',
      );
    }

    const appoitments = await this.appointmentsRepository.findByDate({
      contract_id,
      module,
      date,
    });

    const appointmentsByTeam: IResponse = {};

    if (appoitments) {
      appoitments.forEach(appoitment => {
        if (appointmentsByTeam[String(appoitment.team_id)]) {
          appointmentsByTeam[String(appoitment.team_id)].push(appoitment);
        } else {
          appointmentsByTeam[String(appoitment.team_id)] = [appoitment];
        }
      });
    }

    return appointmentsByTeam;
  }
}

export default ListAppointmentService;
