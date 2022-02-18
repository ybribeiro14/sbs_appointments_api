import Teams from '../../models/entities/Teams';
import ICreateTeamsDTO from './dtos/ICreateTeamsDTO';

export default interface ITeamsRepository {
  findByName(name: string, contract_id: number): Promise<Teams | undefined>;
  findById(id: number): Promise<Teams | undefined>;
  findEnebled(
    contract_id: number,
    module: string,
  ): Promise<Teams[] | undefined>;
  create(teamsData: ICreateTeamsDTO): Promise<Teams>;
  save(teams: Teams): Promise<Teams>;
  list(contract_id: number): Promise<Teams[]>;
  delete(id: number): Promise<boolean>;
  update(teams: Teams): Promise<boolean>;
}
