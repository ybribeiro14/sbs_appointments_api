import { ObjectID } from 'typeorm';
import AppointmentStatus from '../../models/schemas/AppointmentStatus';
import ICreateAppointmentStatusDTO from './dtos/ICreateAppointmentStatusDTO';

export default interface IAppointmentStatusRepository {
  findById(appointment_id: number): Promise<AppointmentStatus | undefined>;
  create(data: ICreateAppointmentStatusDTO): Promise<AppointmentStatus>;
  update(id: ObjectID, historyStatus: string): Promise<boolean>;

  // list(contract_id: number): Promise<AppointmentStatus[]>;
}
