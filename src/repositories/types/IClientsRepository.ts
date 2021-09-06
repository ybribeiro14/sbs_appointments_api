import Clients from '../../models/entities/Clients';
import ICreateClientDTO from './dtos/ICreateClientDTO';

export default interface IClientsRepository {
  findByCnpj(cnpj: string): Promise<Clients | undefined>;
  findById(id: number): Promise<Clients | undefined>;
  create(data: ICreateClientDTO): Promise<Clients>;
  save(client: Clients): Promise<Clients>;
  list(contract_id: number): Promise<Clients[]>;
  delete(id: number): Promise<boolean>;
  update(client: Clients): Promise<boolean>;
}
