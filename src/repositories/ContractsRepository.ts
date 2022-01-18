import { getRepository, Repository } from 'typeorm';

import ICreateContractDTO from './types/dtos/ICreateContractDTO';
import IContractsRepository from './types/IContractsRepository';

import Contracts from '../models/entities/Contracts';

class ContractsRepository implements IContractsRepository {
  private ormRepository: Repository<Contracts>;

  constructor() {
    this.ormRepository = getRepository(Contracts);
  }

  public async findByContract(
    contract: string,
  ): Promise<Contracts | undefined> {
    try {
      const findContract = await this.ormRepository.findOne({
        where: {
          contract,
        },
      });

      return findContract;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async findById(id: number): Promise<Contracts | undefined> {
    try {
      const findContract = await this.ormRepository.findOne(id);

      return findContract;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async create(contractData: ICreateContractDTO): Promise<Contracts> {
    try {
      const contract = this.ormRepository.create(contractData);

      await this.ormRepository.save(contract);

      return contract;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async save(contract: Contracts): Promise<Contracts> {
    try {
      return this.ormRepository.save(contract);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async list(): Promise<Contracts[]> {
    try {
      return this.ormRepository.find();
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

export default ContractsRepository;
