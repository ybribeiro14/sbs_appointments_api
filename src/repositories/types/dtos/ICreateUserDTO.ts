export default interface ICreateUserDTO {
  name: string;
  login: string;
  password: string;
  contract_id: number;
  permission_id: number;
  spawn_module: boolean;
  loading_module: boolean;
  inventory_module: boolean;
  painel_adm: boolean;
  concierge: boolean;
  checker: boolean;
  supervisor: boolean;
}
