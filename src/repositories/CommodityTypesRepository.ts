import { getRepository, Repository } from 'typeorm';

import ICreateCommodityTypeDTO from './types/dtos/ICreateCommodityTypeDTO';
import ICommodityTypesRepository from './types/ICommodityTypesRepository';

import CommodityTypes from '../models/entities/CommodityTypes';

class CommodityTypesRepository implements ICommodityTypesRepository {
  private ormRepository: Repository<CommodityTypes>;

  constructor() {
    this.ormRepository = getRepository(CommodityTypes);
  }

  public async findByType(
    type: string,
    contract_id: number,
  ): Promise<CommodityTypes | undefined> {
    try {
      const findCommodityType = await this.ormRepository.findOne({
        where: {
          type,
          contract_id,
        },
      });

      return findCommodityType;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async findById(id: number): Promise<CommodityTypes | undefined> {
    try {
      const findCommodityType = await this.ormRepository.findOne(id);

      return findCommodityType;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async create(
    commodityTypeData: ICreateCommodityTypeDTO,
  ): Promise<CommodityTypes> {
    try {
      const commodityType = this.ormRepository.create(commodityTypeData);

      await this.ormRepository.save(commodityType);

      return commodityType;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async save(commodityTypes: CommodityTypes): Promise<CommodityTypes> {
    try {
      return this.ormRepository.save(commodityTypes);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async list(contract_id: number): Promise<CommodityTypes[]> {
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

  public async update(commodityType: CommodityTypes): Promise<boolean> {
    try {
      const commodityTypeUpdated = await this.ormRepository.update(
        {
          id: commodityType.id,
        },
        {
          description: commodityType.description,
          average_operating_time: commodityType.average_operating_time,
        },
      );
      if (!commodityTypeUpdated) {
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

export default CommodityTypesRepository;
