import Appointments from '../../models/entities/Appointments';
import ICreateAppointmentDTO from './dtos/ICreateAppointmentsDTO';
import IListAppointmentsDTO from './dtos/IListAppointmentsDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointments>;
  findByDate(data: IListAppointmentsDTO): Promise<Appointments[] | undefined>;
  findById(id: number): Promise<Appointments | undefined>;
  findLastCode(
    contract_id: number,
    module: string,
    date: string,
  ): Promise<Appointments[] | undefined>;
  updateStatus(id: number, statusId: number): Promise<boolean>;
  update(id: number, dataUpdate: Appointments): Promise<Appointments>;
}
