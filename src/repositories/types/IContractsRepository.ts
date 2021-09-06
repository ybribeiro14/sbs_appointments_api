import Contracts from '../../models/entities/Contracts';
import ICreateContractDTO from './dtos/ICreateContractDTO';

export default interface IContractsRepository {
  findByContract(contract: string): Promise<Contracts | undefined>;
  findById(id: number): Promise<Contracts | undefined>;
  create(data: ICreateContractDTO): Promise<Contracts>;
  save(contract: Contracts): Promise<Contracts>;
  list(): Promise<Contracts[]>;
  delete(id: number): Promise<boolean>;
}
