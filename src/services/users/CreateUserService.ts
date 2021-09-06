import { injectable, inject } from 'tsyringe';

import validadeContract from 'libs/validateContract';
import AppError from '../../errors/AppError';

import User from '../../models/entities/User';
import IUsersRepository from '../../repositories/types/IUsersRepository';
import IHashProvider from '../../container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  login: string;
  name: string;
  password: string;
  contract_id: number;
  permission_id: number;
  spawn_module: boolean;
  loading_module: boolean;
  inventory_module: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    login,
    password,
    contract_id,
    permission_id,
    spawn_module,
    loading_module,
    inventory_module,
  }: IRequest): Promise<User> {
    await validadeContract(contract_id);

    const checkUserExists = await this.usersRepository.findByLogin(
      login,
      contract_id,
    );

    if (checkUserExists) {
      throw new AppError('Login address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      login,
      password: hashedPassword,
      contract_id,
      permission_id,
      spawn_module,
      loading_module,
      inventory_module,
    });

    return user;
  }
}

export default CreateUserService;
