import { addMinutes, format, isBefore, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { ObjectID } from 'typeorm';
import calculateGridIndex from '../../libs/calculateGridIndex';
import generateTimesNeeds from '../../libs/generateTimesNeeds';
import checkTimeAvailable from '../../libs/checkTimeAvailable';
import BusyTimesRepository from '../../repositories/BusyTimesRepository';
import Appointments from '../../models/entities/Appointments';

import IAppointmentsRepository from '../../repositories/types/IAppointmentsRepository';

interface IRequest {
  appointment_id: number;
  data: {
    client_id?: number;
    date?: Date;
    commodity_type?: number;
    amount?: number;
    team_id?: number;
    doc_bl?: string;
    doc_di?: string;
    doc_container?: string;
    obs?: string;
  };
}

@injectable()
class UpdateDataAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    appointment_id,
    data,
  }: IRequest): Promise<Appointments> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );
    if (!appointment) {
      throw new Error('Agendamento informado não existe.');
    }

    if (appointment.status_id === 6) {
      throw new Error(
        'Não é permitido alterar um agendamento que já está cancelado.',
      );
    }
    // agendamento já iniciado
    if (appointment.status_id >= 3) {
      throw new Error(
        'Não é permitido alterar um agendamento que já foi iniciado.',
      );
    }
    if (data.date) {
      // Verificar se é data que já passou
      if (isBefore(data.date, new Date())) {
        throw new Error('Data informada já passou!');
      }
    }
    let checkBusyTimes = false;
    // date | commodity_type | amount | team_id
    const newAppointment: Appointments = { ...appointment, ...data };

    // recalcular o grid_index se necessário;
    if (data.commodity_type || data.amount) {
      const { grids } = await calculateGridIndex({
        amount: newAppointment.amount,
        commodity_types_id: newAppointment.commodity_types_id,
      });

      newAppointment.grid_index = grids;
      checkBusyTimes = true;
    }

    let newBusyTimes: string[] = [];
    let idBusyTimes: ObjectID | undefined;

    // Verificar se há horário disponível se necessário;
    const busyTimesRepository = new BusyTimesRepository();

    if (checkBusyTimes || data.team_id || data.date) {
      // montar array de horários
      const timesGridsNeeds = generateTimesNeeds(
        newAppointment.date,
        newAppointment.grid_index,
      );

      // buscar o anterior para limpar o espaço

      const oldBusyTime = await busyTimesRepository.findByDateTeam(
        appointment.contract_id,
        parseISO(format(appointment.date, 'yyyy-MM-dd')),
        appointment.module,
        appointment.team_id,
      );

      if (oldBusyTime) {
        const listBusyTimesOld: [] = JSON.parse(oldBusyTime?.busy_times);

        let time = appointment.date;
        for (let index = 0; index < appointment.grid_index; index++) {
          const formatedTime = format(time, 'HH:mm');
          const indexHour = listBusyTimesOld.findIndex(
            hour => hour === formatedTime,
          );

          if (indexHour >= 0) {
            listBusyTimesOld.splice(indexHour, 1);
          }

          time = addMinutes(time, 30);
        }
        const busyUpdatedOld = await busyTimesRepository.update(
          oldBusyTime?.id,
          JSON.stringify(listBusyTimesOld),
        );

        if (!busyUpdatedOld) {
          throw new Error(
            'Erro ao tentar atualizar a lista de horários ocupados anteriores.',
          );
        }
      }

      // Verificar se o horário está disponível
      const checkTime = await checkTimeAvailable({
        contract_id: newAppointment.contract_id,
        module: newAppointment.module,
        parsedDate: parseISO(format(newAppointment.date, 'yyyy-MM-dd')),
        team_id: newAppointment.team_id,
        timesGridsNeeds,
      });

      if (!checkTime.busyTimes.length) {
        throw new Error('Não foi possível alterar este agendamento.');
      }
      newBusyTimes = checkTime.busyTimes;
      idBusyTimes = checkTime.idBusyTimes;
    }

    const appointmentUpdated = await this.appointmentsRepository.update(
      newAppointment.id,
      newAppointment,
    );

    if (idBusyTimes) {
      // Atualizar busyTimes

      const busyUpdated = await busyTimesRepository.update(
        idBusyTimes,
        JSON.stringify(newBusyTimes),
      );

      if (!busyUpdated) {
        throw new Error(
          'Erro ao tentar atualizar a lista de horários ocupados.',
        );
      }
    }

    return appointmentUpdated;
  }
}

export default UpdateDataAppointmentService;
