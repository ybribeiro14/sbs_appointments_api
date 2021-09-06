import { Between, getRepository, Repository } from 'typeorm';

import AppError from 'errors/AppError';
import ICreateAppointmentsDTO from './types/dtos/ICreateAppointmentsDTO';
import IListAppointmentsDTO from './types/dtos/IListAppointmentsDTO';
import IAppointmentsRepository from './types/IAppointmentsRepository';

import Appointments from '../models/entities/Appointments';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointments>;

  constructor() {
    this.ormRepository = getRepository(Appointments);
  }

  public async findById(id: number): Promise<Appointments | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    return findAppointment;
  }

  public async findByDate(
    data: IListAppointmentsDTO,
  ): Promise<Appointments[] | undefined> {
    const findAppointments = await this.ormRepository.find({
      where: {
        date: Between(`${data.date} 00:00`, `${data.date} 23:59`),
        contract_id: data.contract_id,
        module: data.module,
      },
      order: {
        date: 'ASC',
      },
    });

    return findAppointments;
  }

  public async findLastCode(
    contract_id: number,
    module: string,
    date: string,
  ): Promise<Appointments[] | undefined> {
    const findAppointments = await this.ormRepository.find({
      select: ['code'],
      where: {
        contract_id,
        module,
        date: Between(`${date} 00:00`, `${date} 23:59`),
      },
      order: {
        id: 'DESC',
      },
      take: 1,
    });

    return findAppointments;
  }

  public async create({
    contract_id,
    module,
    client_id,
    date,
    commodity_types_id,
    amount,
    team_id,
    doc_bl,
    doc_di,
    doc_container,
    obs,
    code,
    grid_index,
    status_id,
  }: ICreateAppointmentsDTO): Promise<Appointments> {
    const appointment = this.ormRepository.create({
      contract_id,
      module,
      client_id,
      date,
      commodity_types_id,
      amount,
      team_id,
      doc_bl,
      doc_di,
      doc_container,
      obs,
      code,
      grid_index,
      status_id,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async updateStatus(id: number, statusId: number): Promise<boolean> {
    try {
      const clientUpdated = await this.ormRepository.update(
        {
          id,
        },
        {
          status_id: statusId,
        },
      );
      if (!clientUpdated) {
        throw new AppError('Não foi possível realizar o update de status', 401);
      }
      return true;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async update(
    id: number,
    dataUpdate: Appointments,
  ): Promise<Appointments> {
    try {
      const clientUpdated = await this.ormRepository.update(
        {
          id,
        },
        {
          ...dataUpdate,
        },
      );
      if (!clientUpdated) {
        throw new AppError('Não foi possível realizar o update de status', 401);
      }
      return dataUpdate;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export default AppointmentsRepository;
