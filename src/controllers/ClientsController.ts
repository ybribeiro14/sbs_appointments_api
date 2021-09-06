import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import validadeContract from 'libs/validateContract';
import * as Yup from 'yup';

import ClientsRepository from '../repositories/ClientsRepository';

export default class ClientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cnpj: Yup.string().min(18).max(18).required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const user = JSON.parse(request.user.id);

    const { contract_id } = user;

    const { name, cnpj } = request.body;

    await validadeContract(contract_id);

    const clientsRepository = new ClientsRepository();

    const clientExist = await clientsRepository.findByCnpj(cnpj);

    if (clientExist) {
      throw new AppError('Cliente já existe.');
    }

    const client = await clientsRepository.create({ name, cnpj, contract_id });

    return response.json(client);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const clientsRepository = new ClientsRepository();

    const user = JSON.parse(request.user.id);

    const { contract_id } = user;

    const clients = await clientsRepository.list(contract_id);
    return response.json(clients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const paramsValidation = {
      id: request.params.id,
      name: request.body.name,
    };
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(paramsValidation))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const clientsRepository = new ClientsRepository();
    const { id } = request.params;
    const checkClientExists = await clientsRepository.findById(Number(id));

    if (!checkClientExists) {
      throw new AppError('ID cliente informado não encontrado.');
    }

    await clientsRepository.update(request.body);

    return response.json({
      message: 'Cliente atualizado com sucesso',
    });
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

    const clientsRepository = new ClientsRepository();
    const { id } = request.params;
    const checkClientExists = await clientsRepository.findById(Number(id));

    if (!checkClientExists) {
      throw new AppError('Id cliente informado não encontrado.');
    }
    await clientsRepository.delete(Number(id));

    return response.json({
      message: 'Cliente deletado com sucesso',
    });
  }
}
