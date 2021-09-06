import { Request, Response } from 'express';
import validadeContract from 'libs/validateContract';
import { container } from 'tsyringe';
import * as Yup from 'yup';

import UpdateStatusAppointmentService from 'services/appointments/UpdateStatusAppointmentService';
import UpdateDataAppointmentService from 'services/appointments/UpdateDataAppointmentService';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/appointments/CreateAppointmentService';
import ListAppointmentService from '../services/appointments/ListAppointmentService';
import CancelAppointmentService from '../services/appointments/CancelAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
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

    return response.json({ appointment });
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      module: Yup.string().required(),
      date: Yup.string().required(),
    });
    if (!(await schema.isValid(request.params))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
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

    return response.json({ appointments });
  }

  public async cancel(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      appointment_id: Yup.number().required(),
      justify: Yup.string().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const user = JSON.parse(request.user.id);

    const { contract_id, login: userLogin } = user;

    await validadeContract(contract_id);

    const { appointment_id, justify } = request.body;

    const cancelAppointmentService = container.resolve(
      CancelAppointmentService,
    );

    const appointmentUpdateded = await cancelAppointmentService.execute({
      appointment_id,
      contract_id,
      justify,
      userLogin,
    });

    return response.json(appointmentUpdateded);
  }

  public async update(request: Request, response: Response): Promise<Response> {
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
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
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

    return response.json(appointmentUpdateded);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const schema = Yup.object().shape({
      appointmentId: Yup.string().required(),
      statusId: Yup.string().required(),
    });
    if (!(await schema.isValid(request.params))) {
      return response.json({
        error: 'Falha na validação',
        statusCode: 400,
      });
    }

    const user = JSON.parse(request.user.id);

    const { contract_id, login: userLogin } = user;

    await validadeContract(contract_id);

    const { appointmentId, statusId } = request.params;

    const updateStatusAppointmentService = container.resolve(
      UpdateStatusAppointmentService,
    );

    const appointmentUpdateded = await updateStatusAppointmentService.execute({
      appointment_id: Number(appointmentId),
      statusId: Number(statusId),
      userLogin,
    });

    return response.json(appointmentUpdateded);
  }
}
