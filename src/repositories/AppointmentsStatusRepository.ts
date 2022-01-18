import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import IAppointmentStatusRepository from './types/IAppointmentStatusRepository';

import AppointmentStatus from '../models/schemas/AppointmentStatus';
import ICreateAppointmentStatusDTO from './types/dtos/ICreateAppointmentStatusDTO';

class AppointmentStatusRepository implements IAppointmentStatusRepository {
  private ormRepository: MongoRepository<AppointmentStatus>;

  constructor() {
    this.ormRepository = getMongoRepository(AppointmentStatus, 'mongo');
  }

  public async findById(
    appointment_id: number,
  ): Promise<AppointmentStatus | undefined> {
    const findBusyTimes = await this.ormRepository.findOne({
      where: {
        appointment_id,
      },
    });

    return findBusyTimes;
  }

  public async create({
    appointment_id,
    code,
    contract_id,
    module,
    status_history,
  }: ICreateAppointmentStatusDTO): Promise<AppointmentStatus> {
    const appointmentStatusCreate = this.ormRepository.create({
      appointment_id,
      code,
      contract_id,
      status_history,
      module,
    });

    await this.ormRepository.save(appointmentStatusCreate);

    return appointmentStatusCreate;
  }

  public async update(id: ObjectID, statusHistory: string): Promise<boolean> {
    try {
      const appointmentStatusUpdated = await this.ormRepository.update(
        {
          id,
        },
        {
          status_history: statusHistory,
        },
      );
      if (!appointmentStatusUpdated) {
        throw new Error('Não foi possível realizar o update');
      }
      return true;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default AppointmentStatusRepository;
