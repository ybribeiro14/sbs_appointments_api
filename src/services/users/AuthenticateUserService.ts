import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '../../config/auth';

import Contracts from '../../models/entities/Contracts';
import ContractsRepository from '../../repositories/ContractsRepository';

import User from '../../models/entities/User';
import IUsersRepository from '../../repositories/types/IUsersRepository';
import IHashProvider from '../../container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  login: string;
  password: string;
  contract_id: number;
}

interface IResponse {
  user: User;
  token: string;
  contract: Contracts;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    login,
    password,
    contract_id,
  }: IRequest): Promise<IResponse> {
    const contractsRepository = new ContractsRepository();

    const contract = await contractsRepository.findById(contract_id);
    if (!contract) {
      throw new Error('Contrato informado não possui cadastro.');
    }

    const user = await this.usersRepository.findByLogin(login, contract_id);

    if (!user) {
      throw new Error('Combinação contrato/login/senha incorreta.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new Error('Combinação contrato/login/senha incorreta.');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: JSON.stringify({
        login: user.login,
        contract_id: user.contract_id,
        id: user.id,
      }),
      expiresIn,
    });

    return { user, token, contract };
  }
}

export default AuthenticateUserService;
