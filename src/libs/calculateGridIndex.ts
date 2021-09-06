import CommodityTypesRepository from 'repositories/CommodityTypesRepository';
import AppError from '../errors/AppError';

interface IParamsCalculateGrid {
  commodity_types_id: number;
  amount: number;
}

const calculateGridIndex = async ({
  commodity_types_id,
  amount,
}: IParamsCalculateGrid): Promise<number> => {
  try {
    const commodityTypesRepository = new CommodityTypesRepository();

    const commodityType = await commodityTypesRepository.findById(
      commodity_types_id,
    );
    if (!commodityType) {
      throw new AppError('Tipo de mercadoria não encontrado.');
    }

    const predictedTimeMinutes = amount / commodityType.average_operating_time;

    return Math.ceil(predictedTimeMinutes / 30);
  } catch (error) {
    throw new AppError(error);
  }
};

export default calculateGridIndex;
