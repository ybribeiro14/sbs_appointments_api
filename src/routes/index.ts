import { Router } from 'express';
import usersRouter from './users/users.routes';
import sessionsRouter from './users/sessions.routes';
import appointmentsRouter from './appointments/appointments.routes';
import clientsRouter from './clients/clients.routes';
import commodityTypesRouter from './commodityTypes/commodityTypes.routes';
import teamsRouter from './teams/teams.routes';
import contractsRouter from './users/contracts.routes';

const routes = Router();

routes.use('/clients', clientsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/commodity_types', commodityTypesRouter);
routes.use('/teams', teamsRouter);
routes.use('/contracts', contractsRouter);

export default routes;
