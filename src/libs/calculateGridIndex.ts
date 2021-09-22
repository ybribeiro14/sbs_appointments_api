import CommodityTypes from 'models/entities/CommodityTypes';
import CommodityTypesRepository from 'repositories/CommodityTypesRepository';
import AppError from '../errors/AppError';

interface IParamsCalculateGrid {
  commodity_types_id: number;
  amount: number;
}

interface IReturnData {
  grids: number;
  commodityType: CommodityTypes;
}

const calculateGridIndex = async ({
  commodity_types_id,
  amount,
}: IParamsCalculateGrid): Promise<IReturnData> => {
  try {
    const commodityTypesRepository = new CommodityTypesRepository();

    const commodityType = await commodityTypesRepository.findById(
      commodity_types_id,
    );
    if (!commodityType) {
      throw new AppError('Tipo de mercadoria não encontrado.');
    }

    const predictedTimeMinutes = amount / commodityType.average_operating_time;

    return { grids: Math.ceil(predictedTimeMinutes / 30), commodityType };
  } catch (error) {
    throw new AppError(error);
  }
};

export default calculateGridIndex;
