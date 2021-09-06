import ContractsRepository from 'repositories/ContractsRepository';
import AppError from '../errors/AppError';

const validadeContract = async (contract_id: number): Promise<boolean> => {
  try {
    const contractsRepository = new ContractsRepository();

    const checkContract = await contractsRepository.findById(contract_id);
    if (!checkContract) {
      throw new AppError('Contrato informado não possui cadastro.');
    }

    return true;
  } catch (error) {
    throw new AppError(error);
  }
};

export default validadeContract;
