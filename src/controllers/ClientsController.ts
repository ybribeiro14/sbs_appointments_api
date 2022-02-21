import { Request, Response } from 'express';
import * as Yup from 'yup';
import ResponseSuccess from '../libs/responseSuccess';
import AppError from '../errors/AppError';
import validadeContract from '../libs/validateContract';

import ClientsRepository from '../repositories/ClientsRepository';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        cnpj: Yup.string().min(18).max(18).required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const { name, cnpj } = request.body;

      await validadeContract(contract_id);

      const clientsRepository = new ClientsRepository();

      const clientExist = await clientsRepository.findByCnpj(cnpj);

      if (clientExist) {
        throw new Error('Cliente já existe.');
      }

      const client = await clientsRepository.create({
        name,
        cnpj,
        contract_id,
      });

      return response.json(new ResponseSuccess({ client }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar um cliente',
          (error as Error).message,
        ),
      );
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const clientsRepository = new ClientsRepository();

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const clients = await clientsRepository.list(contract_id);
      return response.json(new ResponseSuccess({ clients }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar listar um cliente',
          (error as Error).message,
        ),
      );
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const paramsValidation = {
        id: request.params.id,
        name: request.body.name,
      };
      const schema = Yup.object().shape({
        id: Yup.number().required(),
      });
      if (!(await schema.isValid(paramsValidation))) {
        throw new Error('Falha na validação');
      }

      const clientsRepository = new ClientsRepository();
      const { id } = request.params;
      const checkClientExists = await clientsRepository.findById(Number(id));

      if (!checkClientExists) {
        throw new Error('ID cliente informado não encontrado.');
      }

      await clientsRepository.update({
        id: Number(id),
        ...request.body,
      });

      return response.json(
        new ResponseSuccess({
          message: 'Cliente atualizado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar atualizar um cliente',
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

      const clientsRepository = new ClientsRepository();
      const { id } = request.params;
      const checkClientExists = await clientsRepository.findById(Number(id));

      if (!checkClientExists) {
        throw new Error('Id cliente informado não encontrado.');
      }
      await clientsRepository.delete(Number(id));

      return response.json(
        new ResponseSuccess({
          message: 'Cliente deletado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar deletar um cliente',
          (error as Error).message,
        ),
      );
    }
  }
}
