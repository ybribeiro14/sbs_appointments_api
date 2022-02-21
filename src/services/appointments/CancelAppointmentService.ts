import { addMinutes, format, getTime, parseISO } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import BusyTimesRepository from '../../repositories/BusyTimesRepository';
import {
  enum_status_loadind_module,
  enum_status_spawn_module,
} from '../../libs/enums';

import IAppointmentsRepository from '../../repositories/types/IAppointmentsRepository';

import AppointmentsStatusRepository from '../../repositories/AppointmentsStatusRepository';

interface IRequest {
  appointment_id: number;
  justify: string;
  userId: number;
  contract_id: number;
}

interface IResponse {
  status: string;
  timestamp: number;
  date_formated: string;
  user: string;
}

interface IStatusObject {
  id: number;
  type: string;
  initials: string;
  description: string;
}

@injectable()
class CancelAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    appointment_id,
    justify,
    userId,
    contract_id,
  }: IRequest): Promise<IResponse[]> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new Error('Agendamento informado não existe.');
    }

    if (appointment.status_id === 6) {
      throw new Error('Agendamento informado já está cancelado.');
    }

    switch (appointment.module) {
      case 'loading_module':
        if (
          appointment.status_id ===
          enum_status_loadind_module.TRUCK_DISPATCHED.id
        ) {
          throw new Error(
            'Não é permitido cancelar um agendamento com este status.',
          );
        }
        break;
      case 'spawn_module':
        if (
          appointment.status_id === enum_status_spawn_module.FINISHED_SPAWN.id
        ) {
          throw new Error(
            'Não é permitido cancelar um agendamento com este status.',
          );
        }
        break;

      default:
        break;
    }

    const appointmentsStatusRepository = new AppointmentsStatusRepository();

    const hashStatus = await appointmentsStatusRepository.findById(
      appointment_id,
    );

    if (!hashStatus) {
      throw new Error(
        'Não foi possível cancelar esta Agenda. Hash não encontrado',
      );
    }

    const statusHistory = JSON.parse(hashStatus.status_history);

    const dateStatus = new Date();
    const status = {
      status: 'canceled',
      timestamp: getTime(dateStatus),
      date_formated: format(dateStatus, 'dd/MM/yyyy HH:mm'),
      user: userId,
      justify,
    };
    statusHistory.push(status);

    // Atualizar status na tabela;

    await this.appointmentsRepository.updateStatus(appointment.id, 6, userId);

    // Atualizar hash de status da agenda (mongoDB);

    await appointmentsStatusRepository.update(
      hashStatus.id,
      JSON.stringify(statusHistory),
    );

    // Atualizar lista de horários ocupados
    const dateBusyTimes = parseISO(format(appointment.date, 'yyyy-MM-dd'));

    const busyTimesRepository = new BusyTimesRepository();
    const busyTimesByDate = await busyTimesRepository.findByDateTeam(
      contract_id,
      dateBusyTimes,
      appointment.module,
      appointment.team_id,
    );
    if (busyTimesByDate?.busy_times) {
      const listBusyTimes: [] = JSON.parse(busyTimesByDate?.busy_times);

      let time = appointment.date;
      for (let index = 0; index < appointment.grid_index; index++) {
        const formatedTime = format(time, 'HH:mm');
        const indexHour = listBusyTimes.findIndex(
          hour => hour === formatedTime,
        );

        if (indexHour >= 0) {
          listBusyTimes.splice(indexHour, 1);
        }

        time = addMinutes(time, 30);
      }

      await busyTimesRepository.update(
        busyTimesByDate.id,
        JSON.stringify(listBusyTimes),
      );
    }

    return statusHistory;
  }
}

export default CancelAppointmentService;
