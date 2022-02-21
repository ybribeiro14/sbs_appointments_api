import { Request, Response } from 'express';
import * as Yup from 'yup';
import AppError from '../errors/AppError';
import ResponseSuccess from '../libs/responseSuccess';
import validadeContract from '../libs/validateContract';

import CommodityTypesRepository from '../repositories/CommodityTypesRepository';

export default class CommodityTypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        type: Yup.string().required(),
        description: Yup.string().required(),
        average_operating_time: Yup.number().positive().required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
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
        throw new Error('Tipo de Mercadoria já existe.');
      }

      const commodityType = await commodityTypesRepository.create({
        type,
        description,
        average_operating_time: average_operating_time / 60, // Quantidade por minuto
        contract_id,
      });

      return response.json(new ResponseSuccess({ commodityType }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar um tipo de mercadoria',
          (error as Error).message,
        ),
      );
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const commodityTypesRepository = new CommodityTypesRepository();

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const commodityTypes = await commodityTypesRepository.list(contract_id);
      return response.json(new ResponseSuccess({ commodityTypes }));
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
        description: request.body.description,
        average_operating_time: request.body.average_operating_time,
      };
      const schema = Yup.object().shape({
        id: Yup.number().required(),
      });
      if (!(await schema.isValid(paramsValidation))) {
        throw new Error('Falha na validação');
      }

      const commodityTypesRepository = new CommodityTypesRepository();
      const { id } = request.params;
      const checkCommodityTypeExists = await commodityTypesRepository.findById(
        Number(id),
      );

      if (!checkCommodityTypeExists) {
        throw new Error('ID do tipo de mercadoria informado não encontrado.');
      }

      await commodityTypesRepository.update({
        ...request.body,
        id: Number(id),
        average_operating_time: request.body.average_operating_time / 60,
      });

      return response.json(
        new ResponseSuccess({
          message: 'Tipo de mercadoria atualizado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar atualizar um Tipo de mercadoria',
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

      const commodityTypesRepository = new CommodityTypesRepository();
      const { id } = request.params;
      const checkCommodityTypeExists = await commodityTypesRepository.findById(
        Number(id),
      );

      if (!checkCommodityTypeExists) {
        throw new Error('Id do tipo de mercadoria informado não encontrado.');
      }
      await commodityTypesRepository.delete(Number(id));

      return response.json(
        new ResponseSuccess({
          message: 'Tipo de mercadoria deletado com sucesso',
        }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar deletar um Tipo de mercadoria',
          (error as Error).message,
        ),
      );
    }
  }
}
