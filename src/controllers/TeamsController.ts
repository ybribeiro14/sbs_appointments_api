import { Request, Response } from 'express';
import * as Yup from 'yup';
import AppError from '../errors/AppError';
import ResponseSuccess from '../libs/responseSuccess';
import validadeContract from '../libs/validateContract';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import TeamsRepository from '../repositories/TeamsRepository';

export default class TeamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        loading_module: Yup.boolean().required(),
        spawn_module: Yup.boolean().required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const { name } = request.body;

      await validadeContract(contract_id);

      const teamsRepository = new TeamsRepository();

      const commodityTypeExist = await teamsRepository.findByName(
        name,
        contract_id,
      );

      if (commodityTypeExist) {
        throw new Error('Já existe um time com este nome.');
      }

      const team = await teamsRepository.create({
        ...request.body,
        contract_id,
      });

      return response.json(new ResponseSuccess({ team }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar uma equipe',
          (error as Error).message,
        ),
      );
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const teamsRepository = new TeamsRepository();

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const teams = await teamsRepository.list(contract_id);
      return response.json(new ResponseSuccess({ teams }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar listar uma equipe',
          (error as Error).message,
        ),
      );
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const paramsValidation = {
        id: request.params.id,
        loading_module: request.body.loading_module,
        spawn_module: request.body.spawn_module,
      };
      const schema = Yup.object().shape({
        id: Yup.number().required(),
        loading_module: Yup.boolean().required(),
        spawn_module: Yup.boolean().required(),
      });
      if (!(await schema.isValid(paramsValidation))) {
        throw new Error('Falha na validação');
      }
      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      await validadeContract(contract_id);

      const teamsRepository = new TeamsRepository();
      const { id } = request.params;
      const checkTeamExists = await teamsRepository.findById(Number(id));

      if (!checkTeamExists) {
        throw new Error('ID da equipe informado não foi encontrado.');
      }
      const appoitmentsRepository = new AppointmentsRepository();

      if (!request.body.loading_module) {
        const checkTeamAppointmentEnable = await appoitmentsRepository.checkStatusByTeam(
          Number(id),
          contract_id,
          'loading_module',
        );

        console.log(checkTeamAppointmentEnable);

        if (checkTeamAppointmentEnable.length) {
          throw new Error(
            'Não é permitido desabilitar essa equipe por que ela possui um carregamento em aberto.',
          );
        }
      }
      if (!request.body.spawn_module) {
        const checkTeamAppointmentEnable = await appoitmentsRepository.checkStatusByTeam(
          Number(id),
          contract_id,
          'spawn_module',
        );

        if (checkTeamAppointmentEnable.length) {
          throw new Error(
            'Não é permitido desabilitar essa equipe por que ela possui uma desova em aberto.',
          );
        }
      }

      await teamsRepository.update({
        id: Number(id),
        ...request.body,
      });

      return response.json(
        new ResponseSuccess({
          message: 'Equipe atualizada com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar atualizar uma equipe',
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

      const teamsRepository = new TeamsRepository();
      const { id } = request.params;
      const checkTeamExists = await teamsRepository.findById(Number(id));

      if (!checkTeamExists) {
        throw new Error('Id equipe informado não encontrado.');
      }
      await teamsRepository.delete(Number(id));

      return response.json(
        new ResponseSuccess({
          message: 'Equipe deletada com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar deletar uma equipe',
          (error as Error).message,
        ),
      );
    }
  }
}
