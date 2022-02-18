import { getRepository, Repository } from 'typeorm';

import ICreateTeamsDTO from './types/dtos/ICreateTeamsDTO';
import ITeamsRepository from './types/ITeamsRepository';

import Teams from '../models/entities/Teams';

interface IWhereConditionsProps {
  contract_id: number;
  loading_module?: boolean;
  spawn_module?: boolean;
}

class TeamsRepository implements ITeamsRepository {
  private ormRepository: Repository<Teams>;

  constructor() {
    this.ormRepository = getRepository(Teams);
  }

  public async findByName(
    name: string,
    contract_id: number,
  ): Promise<Teams | undefined> {
    try {
      const findTeam = await this.ormRepository.findOne({
        where: {
          name,
          contract_id,
        },
      });

      return findTeam;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async findEnebled(
    contract_id: number,
    module: string,
  ): Promise<Teams[] | undefined> {
    try {
      const whereConditions: IWhereConditionsProps = {
        contract_id,
      };
      if (module === 'loading_module') {
        whereConditions.loading_module = true;
      }
      if (module === 'spawn_module') {
        whereConditions.spawn_module = true;
      }
      const findTeams = await this.ormRepository.find({
        where: whereConditions,
      });

      return findTeams;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async findById(id: number): Promise<Teams | undefined> {
    try {
      const findTeam = await this.ormRepository.findOne(id);

      return findTeam;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async create(teamsData: ICreateTeamsDTO): Promise<Teams> {
    try {
      const teams = this.ormRepository.create(teamsData);

      await this.ormRepository.save(teams);

      return teams;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async save(teams: Teams): Promise<Teams> {
    try {
      return this.ormRepository.save(teams);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async list(contract_id: number): Promise<Teams[]> {
    try {
      return this.ormRepository.find({
        where: {
          contract_id,
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async update(teams: Teams): Promise<boolean> {
    try {
      const teamsUpdated = await this.ormRepository.update(
        {
          id: teams.id,
        },
        {
          loading_module: teams.loading_module,
          spawn_module: teams.spawn_module,
        },
      );
      if (!teamsUpdated) {
        throw new Error('Não foi possível realizar o update');
      }
      return true;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      await this.ormRepository.delete({
        id,
      });
      return true;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default TeamsRepository;
