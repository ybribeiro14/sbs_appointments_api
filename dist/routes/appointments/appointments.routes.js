"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var AppointmentsController_1 = __importDefault(require("../../controllers/AppointmentsController"));
var appointmentsRouter = (0, express_1.Router)();
var appointmentsController = new AppointmentsController_1.default();
appointmentsRouter.use(ensureAuthenticated_1.default);
appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.post('/cancel', appointmentsController.cancel);
appointmentsRouter.get('/:module/:date', appointmentsController.list);
appointmentsRouter.put('/status/:statusId/appointment/:appointmentId', appointmentsController.updateStatus);
appointmentsRouter.put('/:appointment_id', appointmentsController.update);
appointmentsRouter.post('/available/hours', appointmentsController.listAvaiableHours);
exports.default = appointmentsRouter;
