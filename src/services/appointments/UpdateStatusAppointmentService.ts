import { format, getTime } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import {
  enum_status_loadind_module,
  enum_status_spawn_module,
} from '../../libs/enums';

import IAppointmentsRepository from '../../repositories/types/IAppointmentsRepository';

import AppointmentsStatusRepository from '../../repositories/AppointmentsStatusRepository';
import { io } from '../../http';

interface IRequest {
  appointment_id: number;
  statusId: number;
  user: {
    login: string;
    id: number;
  };
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
class UpdateStatusAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    appointment_id,
    statusId,
    user,
  }: IRequest): Promise<IResponse[]> {
    const appointment = await this.appointmentsRepository.findById(
      appointment_id,
    );

    if (!appointment) {
      throw new Error('Agendamento informado não existe.');
    }

    const previousStatus = appointment.status_id;

    let checker_id;

    let typeNewStatus: IStatusObject | undefined;
    if (appointment.module === 'loading_module') {
      const statusLoadindModule: IStatusObject[] = Object.values(
        enum_status_loadind_module,
      );
      typeNewStatus = statusLoadindModule.find(stat => stat.id === statusId);
      switch (statusId) {
        case enum_status_loadind_module.TRUCK_ARRIVED.id:
          if (previousStatus !== enum_status_loadind_module.SCHEDULED.id) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_loadind_module.TRUCK_ENTERED.id:
          if (previousStatus !== enum_status_loadind_module.TRUCK_ARRIVED.id) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_loadind_module.LOADING_STARTED.id:
          checker_id = user.id;
          if (previousStatus !== enum_status_loadind_module.TRUCK_ENTERED.id) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_loadind_module.FINISHED_LOADING.id:
          if (
            previousStatus !== enum_status_loadind_module.LOADING_STARTED.id
          ) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_loadind_module.TRUCK_DISPATCHED.id:
          if (
            previousStatus !== enum_status_loadind_module.FINISHED_LOADING.id
          ) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_loadind_module.CANCELED.id:
          throw new Error('Agendamento cancelado não permite alteração.');

        default:
          throw new Error('Status informado não existe.');
      }
    } else {
      const statusSpawnModule: IStatusObject[] = Object.values(
        enum_status_spawn_module,
      );
      typeNewStatus = statusSpawnModule.find(stat => stat.id === statusId);

      switch (statusId) {
        case enum_status_spawn_module.SPAWN_STARTED.id:
          checker_id = user.id;

          if (previousStatus !== enum_status_spawn_module.SCHEDULED.id) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_spawn_module.FINISHED_SPAWN.id:
          if (previousStatus !== enum_status_spawn_module.SPAWN_STARTED.id) {
            throw new Error(
              'Status atual não permite alterar para o status informado.',
            );
          }
          break;
        case enum_status_spawn_module.CANCELED.id:
          throw new Error('Agendamento cancelado não permite alteração.');

        default:
          throw new Error('Status informado não existe.');
      }
    }

    // Atualizar hash de status da agenda (mongoDB);

    const appointmentsStatusRepository = new AppointmentsStatusRepository();

    const hashStatus = await appointmentsStatusRepository.findById(
      appointment_id,
    );

    if (!hashStatus) {
      throw new Error(
        'Não foi possível realizar a atualização de Status. Hash não encontrado',
      );
    }

    const statusHistory = JSON.parse(hashStatus.status_history);

    const dateStatus = new Date();
    const status = {
      status: typeNewStatus?.type,
      timestamp: getTime(dateStatus),
      date_formated: format(dateStatus, 'dd/MM/yyyy HH:mm'),
      user: user.login,
    };
    statusHistory.push(status);

    await appointmentsStatusRepository.update(
      hashStatus.id,
      JSON.stringify(statusHistory),
    );

    // Atualizar status na tabela;

    await this.appointmentsRepository.updateStatus(
      appointment.id,
      statusId,
      checker_id,
    );

    io.to(`loading_module_${appointment.contract_id}`).emit(
      'update_appointment',
      {
        module: appointment.module,
        date: appointment.date,
      },
    );

    return statusHistory;
  }
}

export default UpdateStatusAppointmentService;
