import { Router } from 'express';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';
import AppointmentsController from '../../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.post('/cancel', appointmentsController.cancel);
appointmentsRouter.get('/:module/:date', appointmentsController.list);
appointmentsRouter.put(
  '/status/:statusId/appointment/:appointmentId',
  appointmentsController.updateStatus,
);
appointmentsRouter.put('/:appointment_id', appointmentsController.update);
appointmentsRouter.post(
  '/available/hours',
  appointmentsController.listAvaiableHours,
);

export default appointmentsRouter;
