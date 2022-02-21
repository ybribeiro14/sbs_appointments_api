import ContractsRepository from '../repositories/ContractsRepository';

const validadeContract = async (contract_id: number): Promise<boolean> => {
  try {
    const contractsRepository = new ContractsRepository();

    const checkContract = await contractsRepository.findById(contract_id);
    if (!checkContract) {
      throw new Error('Contrato informado não possui cadastro.');
    }

    return true;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export default validadeContract;
