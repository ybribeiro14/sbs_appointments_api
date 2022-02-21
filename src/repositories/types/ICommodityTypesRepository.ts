import CommodityTypes from '../../models/entities/CommodityTypes';
import ICreateCommodityTypeDTO from './dtos/ICreateCommodityTypeDTO';

export default interface ICommodityTypesRepository {
  findByType(
    type: string,
    contract_id: number,
  ): Promise<CommodityTypes | undefined>;
  findById(id: number): Promise<CommodityTypes | undefined>;
  create(commodityTypeData: ICreateCommodityTypeDTO): Promise<CommodityTypes>;
  save(commodityType: CommodityTypes): Promise<CommodityTypes>;
  list(contract_id: number): Promise<CommodityTypes[]>;
  delete(id: number): Promise<boolean>;
  update(commodityType: CommodityTypes): Promise<boolean>;
}
