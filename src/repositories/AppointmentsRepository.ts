import { Between, getRepository, In, Repository } from 'typeorm';

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
    const findAppointments = await this.ormRepository.manager.query(`
    SELECT AP.*, US.name as checker_name FROM appointments AS AP left join users US on AP.checker_id = US.id
    WHERE AP.date between '${data.date} 00:00' and  '${data.date} 23:59'
    AND AP.contract_id = ${data.contract_id}
    AND module = '${data.module}'
    AND status_id != 6;
`);

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

  public async updateStatus(
    id: number,
    statusId: number,
    user_id: number | undefined = undefined,
  ): Promise<boolean> {
    try {
      const clientUpdated = await this.ormRepository.update(
        {
          id,
        },
        {
          status_id: statusId,
          checker_id: user_id,
        },
      );
      if (!clientUpdated) {
        throw new Error('Não foi possível realizar o update de status');
      }
      return true;
    } catch (error) {
      throw new Error((error as Error).message);
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
        throw new Error('Não foi possível realizar o update de status');
      }
      return dataUpdate;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async checkStatusByTeam(
    team_id: number,
    contract_id: number,
    module: string,
  ): Promise<Appointments[]> {
    try {
      let status = [0, 1, 2, 3, 4];

      if (module === 'spawn_module') {
        status = [0, 3];
      }
      const checkTeamStatus = await this.ormRepository.find({
        where: {
          contract_id,
          team_id,
          module,
          status_id: In(status),
        },
      });
      return checkTeamStatus;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async checkAppointmentByUser(
    checker_id: number,
    contract_id: number,
  ): Promise<Appointments[]> {
    try {
      const checkUserWithAppointmentActive = await this.ormRepository.find({
        where: {
          contract_id,
          checker_id,
          status_id: 3,
        },
      });
      return checkUserWithAppointmentActive;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default AppointmentsRepository;
