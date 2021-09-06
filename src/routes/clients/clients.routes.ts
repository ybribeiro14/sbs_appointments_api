import { Router } from 'express';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import ClientsController from '../../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.post('/', clientsController.create);
clientsRouter.get('/', clientsController.list);
clientsRouter.put('/:id', clientsController.update);
clientsRouter.delete('/:id', clientsController.delete);

export default clientsRouter;
