import { Request, Response } from 'express';
import * as Yup from 'yup';
import ResponseSuccess from '../libs/responseSuccess';
import AppError from '../errors/AppError';

import ContractsRepository from '../repositories/ContractsRepository';

export default class ContractsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        contract: Yup.string().required(),
        client: Yup.string().required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const { contract, client } = request.body;

      const contractsRepository = new ContractsRepository();

      const contractExist = await contractsRepository.findByContract(contract);

      if (contractExist) {
        throw new Error('Já existe um contrato com este nome.');
      }

      const newContract = await contractsRepository.create({
        contract,
        client,
      });

      return response.json(new ResponseSuccess({ newContract }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar um contrato',
          (error as Error).message,
        ),
      );
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const contractsRepository = new ContractsRepository();

      const contracts = await contractsRepository.list();
      return response.json(new ResponseSuccess({ contracts }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar listar um contrato',
          (error as Error).message,
        ),
      );
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
      });
      if (!(await schema.isValid(request.params))) {
        throw new Error('Falha na validação');
      }

      const contractsRepository = new ContractsRepository();

      const { id } = request.params;
      const checkContractExists = await contractsRepository.findById(
        Number(id),
      );

      if (!checkContractExists) {
        throw new Error('Id do contrato informado não encontrado.');
      }
      await contractsRepository.delete(Number(id));

      return response.json(
        new ResponseSuccess({
          message: 'Contrato deletado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar deletar um contrato',
          (error as Error).message,
        ),
      );
    }
  }
}
