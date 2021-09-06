import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import * as Yup from 'yup';

import ContractsRepository from '../repositories/ContractsRepository';

export default class ContractsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      contract: Yup.string().required(),
      client: Yup.string().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const { contract, client } = request.body;

    const contractsRepository = new ContractsRepository();

    const contractExist = await contractsRepository.findByContract(contract);

    if (contractExist) {
      throw new AppError('Já existe um contrato com este nome.');
    }

    const newContract = await contractsRepository.create({
      contract,
      client,
    });

    return response.json(newContract);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const contractsRepository = new ContractsRepository();

    const contracts = await contractsRepository.list();
    return response.json(contracts);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(request.params))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const contractsRepository = new ContractsRepository();

    const { id } = request.params;
    const checkContractExists = await contractsRepository.findById(Number(id));

    if (!checkContractExists) {
      throw new AppError('Id do contrato informado não encontrado.');
    }
    await contractsRepository.delete(Number(id));

    return response.json({
      message: 'Contrato deletado com sucesso',
    });
  }
}
