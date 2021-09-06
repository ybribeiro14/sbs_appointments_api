import { Router } from 'express';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import TeamsController from '../../controllers/TeamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.use(ensureAuthenticated);

teamsRouter.post('/', teamsController.create);
teamsRouter.get('/', teamsController.list);
teamsRouter.put('/:id', teamsController.update);
teamsRouter.delete('/:id', teamsController.delete);

export default teamsRouter;
