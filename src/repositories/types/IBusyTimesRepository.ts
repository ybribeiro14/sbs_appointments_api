import { ObjectID } from 'typeorm';
import BusyTimes from '../../models/schemas/BusyTimes';
import ICreateBusyTimesDTO from './dtos/ICreateBusyTimesDTO';

export default interface IBusyTimesRepository {
  findByDate(
    contract_id: number,
    module: string,
    date: Date,
  ): Promise<BusyTimes[] | undefined>;
  findByDateTeam(
    contract_id: number,
    date: Date,
    module: string,
    team_id: number,
  ): Promise<BusyTimes | undefined>;
  create(data: ICreateBusyTimesDTO): Promise<BusyTimes>;
  update(id: ObjectID, busyTime: string, teamId: number): Promise<boolean>;
}
