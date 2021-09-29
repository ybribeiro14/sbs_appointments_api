import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '../../errors/AppError';

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
    const user = await this.usersRepository.findByLogin(login, contract_id);

    if (!user) {
      throw new AppError('Combinação contrato/login/senha incorreta.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Combinação contrato/login/senha incorreta.');
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

    return { user, token };
  }
}

export default AuthenticateUserService;
