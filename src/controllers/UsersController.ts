import { Request, Response } from 'express';
import * as Yup from 'yup';
import { container } from 'tsyringe';

import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import ResponseSuccess from '../libs/responseSuccess';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateUserService from '../services/users/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        login: Yup.string().required(),
        password: Yup.string().required(),
        painel_adm: Yup.boolean().required(),
        concierge: Yup.boolean().required(),
        checker: Yup.boolean().required(),
        supervisor: Yup.boolean().required(),
        spawn_module: Yup.boolean().required(),
        loading_module: Yup.boolean().required(),
        inventory_module: Yup.boolean().required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const userRequest = JSON.parse(request.user.id);

      const { contract_id } = userRequest;

      // const contract_id = 1;

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
        checker,
        supervisor,
      } = request.body;

      // Usa o provider para prover o Repositório
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute({
        name,
        login,
        password,
        contract_id,
        permission_id,
        spawn_module,
        loading_module,
        inventory_module,
        painel_adm,
        concierge,
        checker,
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
        checker: user.checker,
        supervisor: user.supervisor,
      };

      return response.json(new ResponseSuccess({ user: userWithoutPassword }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar um usuário',
          (error as Error).message,
        ),
      );
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const usersRepository = new UsersRepository();

      const userRequest = JSON.parse(request.user.id);

      const { contract_id } = userRequest;

      const users = await usersRepository.list(contract_id);
      return response.json(new ResponseSuccess({ users }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar listar usuários',
          (error as Error).message,
        ),
      );
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        id: Yup.number().required(),
      });
      if (!(await schema.isValid(request.params))) {
        throw new Error('Falha na validação');
      }

      const usersRepository = new UsersRepository();
      const { id } = request.params;
      const checkUserExists = await usersRepository.findById(Number(id));

      if (!checkUserExists) {
        throw new Error('Id usuário informado não encontrado.');
      }
      let hashedPassword;
      if (request.body.password !== '') {
        hashedPassword = await hash(request.body.password, 8);
      }

      await usersRepository.update(Number(id), {
        ...request.body,
        password: hashedPassword,
      });

      return response.json(
        new ResponseSuccess({
          message: 'Usuário atualizado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar atualizar um usuário',
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

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const usersRepository = new UsersRepository();
      const { id } = request.params;
      const checkUserExists = await usersRepository.findById(Number(id));

      if (!checkUserExists) {
        throw new Error('Id usuário informado não encontrado.');
      }

      if (checkUserExists.checker) {
        const appoitmentsRepository = new AppointmentsRepository();

        const checkUserWithAppointmentActive = await appoitmentsRepository.checkAppointmentByUser(
          Number(id),
          contract_id,
        );

        if (checkUserWithAppointmentActive) {
          throw new Error(
            'Não é permitido excluir conferente com agendamento em aberto.',
          );
        }
      }

      await usersRepository.delete(Number(id));

      return response.json(
        new ResponseSuccess({
          message: 'Usuário deletado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar deletar um usuário',
          (error as Error).message,
        ),
      );
    }
  }
}
