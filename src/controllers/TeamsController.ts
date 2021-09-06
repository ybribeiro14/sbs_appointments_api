import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import validadeContract from 'libs/validateContract';
import * as Yup from 'yup';

import TeamsRepository from '../repositories/TeamsRepository';

export default class TeamsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
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
      throw new AppError('Já existe um time com este nome.');
    }

    const team = await teamsRepository.create({
      name,
      enable: true,
      contract_id,
    });

    return response.json(team);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const teamsRepository = new TeamsRepository();

    const user = JSON.parse(request.user.id);

    const { contract_id } = user;

    const teams = await teamsRepository.list(contract_id);
    return response.json(teams);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const paramsValidation = {
      id: request.params.id,
      enable: request.body.enable,
    };
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      enable: Yup.boolean().required(),
    });
    if (!(await schema.isValid(paramsValidation))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const teamsRepository = new TeamsRepository();
    const { id } = request.params;
    const checkTeamExists = await teamsRepository.findById(Number(id));

    if (!checkTeamExists) {
      throw new AppError('ID da equipe informado não foi encontrado.');
    }

    await teamsRepository.update({
      id: Number(id),
      ...request.body,
    });

    return response.json({
      message: 'Equipe atualizado com sucesso',
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

    const teamsRepository = new TeamsRepository();
    const { id } = request.params;
    const checkTeamExists = await teamsRepository.findById(Number(id));

    if (!checkTeamExists) {
      throw new AppError('Id do tipo de mercadoria informado não encontrado.');
    }
    await teamsRepository.delete(Number(id));

    return response.json({
      message: 'Equipe deletada com sucesso',
    });
  }
}
