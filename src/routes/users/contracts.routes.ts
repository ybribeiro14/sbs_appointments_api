import { Router } from 'express';

import ContractsController from '../../controllers/ContractsController';

const contractsRouter = Router();
const contractsController = new ContractsController();

contractsRouter.post('/', contractsController.create);
contractsRouter.get('/', contractsController.list);
contractsRouter.delete('/:id', contractsController.delete);

export default contractsRouter;
