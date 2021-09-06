import AppError from 'errors/AppError';
import { Request, Response } from 'express';
import validadeContract from 'libs/validateContract';
import * as Yup from 'yup';

import CommodityTypesRepository from '../repositories/CommodityTypesRepository';

export default class CommodityTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      description: Yup.string().required(),
      average_operating_time: Yup.number().positive().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const user = JSON.parse(request.user.id);

    const { contract_id } = user;

    const { type, description, average_operating_time } = request.body;

    await validadeContract(contract_id);

    const commodityTypesRepository = new CommodityTypesRepository();

    const commodityTypeExist = await commodityTypesRepository.findByType(
      type,
      contract_id,
    );

    if (commodityTypeExist) {
      throw new AppError('Tipo de Mercadoria já existe.');
    }

    const commodityType = await commodityTypesRepository.create({
      type,
      description,
      average_operating_time: average_operating_time / 60, // Quantidade por minuto
      contract_id,
    });

    return response.json(commodityType);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const commodityTypesRepository = new CommodityTypesRepository();

    const user = JSON.parse(request.user.id);

    const { contract_id } = user;

    const commodityTypes = await commodityTypesRepository.list(contract_id);
    return response.json(commodityTypes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const paramsValidation = {
      id: request.params.id,
      description: request.body.description,
      average_operating_time: request.body.average_operating_time,
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

    const commodityTypesRepository = new CommodityTypesRepository();
    const { id } = request.params;
    const checkCommodityTypeExists = await commodityTypesRepository.findById(
      Number(id),
    );

    if (!checkCommodityTypeExists) {
      throw new AppError('ID do tipo de mercadoria informado não encontrado.');
    }

    await commodityTypesRepository.update({
      id: Number(id),
      ...request.body,
    });

    return response.json({
      message: 'Tipo de mercadoria atualizado com sucesso',
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

    const commodityTypesRepository = new CommodityTypesRepository();
    const { id } = request.params;
    const checkCommodityTypeExists = await commodityTypesRepository.findById(
      Number(id),
    );

    if (!checkCommodityTypeExists) {
      throw new AppError('Id do tipo de mercadoria informado não encontrado.');
    }
    await commodityTypesRepository.delete(Number(id));

    return response.json({
      message: 'Tipo de mercadoria deletado com sucesso',
    });
  }
}
