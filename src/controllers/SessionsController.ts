import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../services/users/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { login, password, contract_id } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      login,
      password,
      contract_id,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      login: user.login,
      permission_id: user.permission_id,
      contract_id: user.contract_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword, token });
  }
}
