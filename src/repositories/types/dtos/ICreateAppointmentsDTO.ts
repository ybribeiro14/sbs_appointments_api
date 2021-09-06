export default interface ICreateAppointmentDTO {
  code: string;
  contract_id: number;
  module: string;
  client_id: number;
  date: Date;
  commodity_types_id: number;
  amount: number;
  team_id: number;
  doc_bl?: string;
  doc_di?: string;
  doc_container?: string;
  obs?: string;
  status_id: number;
  grid_index: number;
}
