import { getRepository, Repository } from 'typeorm';

import AppError from 'errors/AppError';
import ICreateClientDTO from './types/dtos/ICreateClientDTO';
import IClientsRepository from './types/IClientsRepository';

import Clients from '../models/entities/Clients';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Clients>;

  constructor() {
    this.ormRepository = getRepository(Clients);
  }

  public async findByCnpj(cnpj: string): Promise<Clients | undefined> {
    try {
      const findClient = await this.ormRepository.findOne({
        where: {
          cnpj,
        },
      });

      return findClient;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async findById(id: number): Promise<Clients | undefined> {
    try {
      const findClient = await this.ormRepository.findOne(id);

      return findClient;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async create(clientData: ICreateClientDTO): Promise<Clients> {
    try {
      const client = this.ormRepository.create(clientData);

      await this.ormRepository.save(client);

      return client;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async save(client: Clients): Promise<Clients> {
    try {
      return this.ormRepository.save(client);
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async list(contract_id: number): Promise<Clients[]> {
    try {
      return this.ormRepository.find({
        where: {
          contract_id,
        },
      });
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async update(client: Clients): Promise<boolean> {
    try {
      const clientUpdated = await this.ormRepository.update(
        {
          id: client.id,
        },
        {
          name: client.name,
        },
      );
      if (!clientUpdated) {
        throw new AppError('Não foi possível realizar o update', 401);
      }
      return true;
    } catch (error) {
      throw new AppError(error.message);
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      await this.ormRepository.delete({
        id,
      });
      return true;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export default ClientsRepository;
