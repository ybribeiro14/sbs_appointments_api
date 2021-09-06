import { container } from 'tsyringe';

import './providers';

import IAppointmentsRepository from '../repositories/types/IAppointmentsRepository';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import IUsersRepository from '../repositories/types/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
