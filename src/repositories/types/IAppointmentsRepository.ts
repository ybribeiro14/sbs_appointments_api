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
  updateStatus(
    id: number,
    statusId: number,
    user_id: number | undefined,
  ): Promise<boolean>;
  update(id: number, dataUpdate: Appointments): Promise<Appointments>;
  checkStatusByTeam(
    team_id: number,
    contract_id: number,
    module: string,
  ): Promise<Appointments[] | undefined>;
  checkAppointmentByUser(
    user_id: number,
    contract_id: number,
  ): Promise<Appointments[] | undefined>;
}
