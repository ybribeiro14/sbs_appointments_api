export default interface ICreateUserDTO {
  name: string;
  login: string;
  password: string;
  contract_id: number;
  permission_id: number;
  spawn_module: boolean;
  loading_module: boolean;
  inventory_module: boolean;
}
