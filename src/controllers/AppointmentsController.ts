import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as Yup from 'yup';
import { addMinutes, format, parseISO } from 'date-fns';
import validadeContract from '../libs/validateContract';

import UpdateDataAppointmentService from '../services/appointments/UpdateDataAppointmentService';
import BusyTimesRepository from '../repositories/BusyTimesRepository';
import AppError from '../errors/AppError';
import TeamsRepository from '../repositories/TeamsRepository';
import ResponseSuccess from '../libs/responseSuccess';
import UpdateStatusAppointmentService from '../services/appointments/UpdateStatusAppointmentService';
import CreateAppointmentService from '../services/appointments/CreateAppointmentService';
import ListAppointmentService from '../services/appointments/ListAppointmentService';
import CancelAppointmentService from '../services/appointments/CancelAppointmentService';

import { io } from '../http';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        module: Yup.string().required(),
        client_id: Yup.number().required(),
        date: Yup.string().required(),
        hour: Yup.string().required(),
        commodity_types_id: Yup.number().required(),
        amount: Yup.number().required(),
        team_id: Yup.number().required(),
        doc_bl: Yup.string(),
        doc_di: Yup.string(),
        doc_container: Yup.string(),
        obs: Yup.string(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }
      const user = JSON.parse(request.user.id);

      const { contract_id, login: userLogin } = user;

      const {
        module,
        client_id,
        date,
        hour,
        commodity_types_id,
        amount,
        team_id,
        doc_bl,
        doc_di,
        doc_container,
        obs,
      } = request.body;

      if (
        module === 'spawn_module' &&
        (doc_container === '' || !doc_container)
      ) {
        return response.json({
          error: 'O container é obrigatório no módulo de desova',
          statusCode: 400,
        });
      }

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.execute({
        date,
        hour,
        contract_id,
        module,
        client_id,
        commodity_types_id,
        amount,
        team_id,
        doc_bl,
        doc_di,
        doc_container,
        obs,
        userLogin,
      });

      io.to(`loading_module_${contract_id}`).emit('new_appointment', {
        appointment,
      });

      return response.json(new ResponseSuccess({ appointment }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar um agendamento',
          (error as Error).message,
        ),
      );
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        module: Yup.string().required(),
        date: Yup.string().required(),
      });
      if (!(await schema.isValid(request.params))) {
        throw new Error('Falha na validação');
      }

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      const listAppointments = container.resolve(ListAppointmentService);

      const { module, date } = request.params;

      const appointments = await listAppointments.execute({
        contract_id,
        module,
        date,
      });

      return response.json(new ResponseSuccess({ appointments }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar listar um agendamento',
          (error as Error).message,
        ),
      );
    }
  }

  public async cancel(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        appointment_id: Yup.number().required(),
        justify: Yup.string().required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const user = JSON.parse(request.user.id);

      console.log(user);

      const { contract_id, id: userId } = user;

      await validadeContract(contract_id);

      const { appointment_id, justify } = request.body;

      const cancelAppointmentService = container.resolve(
        CancelAppointmentService,
      );

      const appointmentUpdateded = await cancelAppointmentService.execute({
        appointment_id,
        contract_id,
        justify,
        userId,
      });

      return response.json(new ResponseSuccess({ appointmentUpdateded }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar cancelar um agendamento',
          (error as Error).message,
        ),
      );
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        client_id: Yup.number(),
        date: Yup.string(),
        commodity_type: Yup.number(),
        amount: Yup.number(),
        team_id: Yup.number(),
        doc_bl: Yup.string(),
        doc_di: Yup.string(),
        doc_container: Yup.string(),
        obs: Yup.string(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const { appointment_id } = request.params;

      const updateDataAppointmentService = container.resolve(
        UpdateDataAppointmentService,
      );

      const data = request.body;

      if (data.date) {
        data.date = parseISO(data.date);
      }

      const appointmentUpdateded = await updateDataAppointmentService.execute({
        appointment_id: Number(appointment_id),
        data,
      });

      return response.json(new ResponseSuccess({ appointmentUpdateded }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar atualizar um agendamento',
          (error as Error).message,
        ),
      );
    }
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        appointmentId: Yup.string().required(),
        statusId: Yup.string().required(),
      });
      if (!(await schema.isValid(request.params))) {
        throw new Error('Falha na validação');
      }

      const user = JSON.parse(request.user.id);

      const { contract_id, login: userLogin } = user;

      await validadeContract(contract_id);

      const { appointmentId, statusId } = request.params;

      const updateStatusAppointmentService = container.resolve(
        UpdateStatusAppointmentService,
      );

      const appointmentUpdateded = await updateStatusAppointmentService.execute(
        {
          appointment_id: Number(appointmentId),
          statusId: Number(statusId),
          user: {
            id: user.id,
            login: userLogin,
          },
        },
      );

      return response.json(new ResponseSuccess({ appointmentUpdateded }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar atualizar o status de um agendamento',
          (error as Error).message,
        ),
      );
    }
  }

  public async listAvaiableHours(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const schema = Yup.object().shape({
        date: Yup.string().required(),
        module: Yup.string().required(),
        team_id: Yup.number().required(),
      });
      if (!(await schema.isValid(request.body))) {
        throw new Error('Falha na validação');
      }

      const user = JSON.parse(request.user.id);

      const { contract_id } = user;

      await validadeContract(contract_id);

      const { module, date, team_id } = request.body;

      const teamsRepository = new TeamsRepository();
      const checkTeamExists = await teamsRepository.findById(Number(team_id));

      if (!checkTeamExists) {
        throw new Error('Id do equipe informado não encontrado.');
      }

      const busyTimesRepository = new BusyTimesRepository();

      const dateHours = await busyTimesRepository.findByDateTeam(
        Number(contract_id),
        parseISO(date),
        module,
        Number(team_id),
      );
      const initHour = parseISO(
        `${format(parseISO(date), 'yyyy-MM-dd')} 08:00`,
      );
      const finalHour = parseISO(
        `${format(parseISO(date), 'yyyy-MM-dd')} 23:30`,
      );

      const busyTimes = dateHours ? JSON.parse(dateHours?.busy_times) : [];
      const hoursAvailable = [];

      const dateHourCurrent = format(new Date(), 'HH:mm');
      let dateHour = initHour;

      do {
        const formatedTime = format(dateHour, 'HH:mm');

        const findHourBusyTimes = busyTimes.find(
          (hour: string) => hour === formatedTime,
        );
        if (
          !findHourBusyTimes &&
          (formatedTime >= dateHourCurrent ||
            date !== format(new Date(), 'yyyy-MM-dd'))
        ) {
          hoursAvailable.push(formatedTime);
        }
        dateHour = addMinutes(dateHour, 30);
      } while (dateHour <= finalHour);

      // listar horários disponíveis

      return response.json(new ResponseSuccess({ hoursAvailable }));
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar listar horários disponíveis',
          (error as Error).message,
        ),
      );
    }
  }
}
