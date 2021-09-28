import { Request, Response } from 'express';
import * as Yup from 'yup';
import { container } from 'tsyringe';

import AppError from 'errors/AppError';
import CreateUserService from '../services/users/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      login: Yup.string().required(),
      password: Yup.string().required(),
      painel_adm: Yup.boolean().required(),
      concierge: Yup.boolean().required(),
      lecturer: Yup.boolean().required(),
      supervisor: Yup.boolean().required(),
      spawn_module: Yup.boolean().required(),
      loading_module: Yup.boolean().required(),
      inventory_module: Yup.boolean().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    // const userRequest = JSON.parse(request.user.id);

    // const { contract_id } = userRequest;

    const {
      name,
      login,
      password,
      permission_id,
      spawn_module,
      loading_module,
      inventory_module,
      painel_adm,
      concierge,
      lecturer,
      supervisor,
    } = request.body;

    // Usa o provider para prover o Repositório
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      login,
      password,
      contract_id: 1,
      permission_id,
      spawn_module,
      loading_module,
      inventory_module,
      painel_adm,
      concierge,
      lecturer,
      supervisor,
    });

    // Com a atualização do TypeScript, isso se faz necessário
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      login: user.login,
      contract_id: user.contract_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      spawn_module: user.spawn_module,
      loading_module: user.loading_module,
      inventory_module: user.inventory_module,
      painel_adm: user.painel_adm,
      concierge: user.concierge,
      lecturer: user.lecturer,
      supervisor: user.supervisor,
    };

    return response.json(userWithoutPassword);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const userRequest = JSON.parse(request.user.id);

    const { contract_id } = userRequest;

    const users = await usersRepository.list(contract_id);
    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (!(await schema.isValid(request.params))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const usersRepository = new UsersRepository();
    const { id } = request.params;
    const checkUserExists = await usersRepository.findById(Number(id));

    if (!checkUserExists) {
      throw new AppError('Id usuário informado não encontrado.');
    }

    await usersRepository.update(Number(id), request.body);

    return response.json({
      message: 'Usuário atualizado com sucesso',
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

    const usersRepository = new UsersRepository();
    const { id } = request.params;
    const checkUserExists = await usersRepository.findById(Number(id));

    if (!checkUserExists) {
      throw new AppError('Id usuário informado não encontrado.');
    }
    await usersRepository.delete(Number(id));

    return response.json({
      message: 'Usuário deletado com sucesso',
    });
  }
}
