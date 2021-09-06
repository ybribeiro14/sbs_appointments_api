import { Router } from 'express';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import CommodityTypesController from '../../controllers/CommodityTypesController';

const commodityTypesRouter = Router();
const commodityTypesController = new CommodityTypesController();

commodityTypesRouter.use(ensureAuthenticated);

commodityTypesRouter.post('/', commodityTypesController.create);
commodityTypesRouter.get('/', commodityTypesController.list);
commodityTypesRouter.put('/:id', commodityTypesController.update);
commodityTypesRouter.delete('/:id', commodityTypesController.delete);

export default commodityTypesRouter;
