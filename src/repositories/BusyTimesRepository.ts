import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import AppError from 'errors/AppError';
import ICreateBusyTimesDTO from './types/dtos/ICreateBusyTimesDTO';
import IListAppointmentsDTO from './types/dtos/IListAppointmentsDTO';
import IListBusyTimeByTeamDTO from './types/dtos/IListBusyTimeByTeamDTO';

import IBusyTimesRepository from './types/IBusyTimesRepository';

import BusyTimes from '../models/schemas/BusyTimes';

class BusyTimesRepository implements IBusyTimesRepository {
  private ormRepository: MongoRepository<BusyTimes>;

  constructor() {
    this.ormRepository = getMongoRepository(BusyTimes, 'mongo');
  }

  public async findByDate(
    contract_id: number,
    module: string,
    date: Date,
  ): Promise<BusyTimes[] | undefined> {
    const findBusyTimes = await this.ormRepository.find({
      where: {
        contract_id,
        module,
        date,
      },
    });

    return findBusyTimes;
  }

  public async findByDateTeam(
    contract_id: number,
    date: Date,
    module: string,
    team_id: number,
  ): Promise<BusyTimes | undefined> {
    const findBusyTime = await this.ormRepository.findOne({
      where: {
        contract_id,
        module,
        date,
        team_id,
      },
    });

    return findBusyTime;
  }

  public async create({
    busy_times,
    contract_id,
    date,
    team_id,
    module,
  }: ICreateBusyTimesDTO): Promise<BusyTimes> {
    const busyTimesCreate = this.ormRepository.create({
      busy_times,
      contract_id,
      date,
      team_id,
      module,
    });

    await this.ormRepository.save(busyTimesCreate);

    return busyTimesCreate;
  }

  public async update(id: ObjectID, busyTime: string): Promise<boolean> {
    try {
      const busyTimeUpdated = await this.ormRepository.update(
        {
          id,
        },
        {
          busy_times: busyTime,
        },
      );
      if (!busyTimeUpdated) {
        throw new AppError('Não foi possível realizar o update', 401);
      }
      return true;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export default BusyTimesRepository;
