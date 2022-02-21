"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var ClientsController_1 = __importDefault(require("../../controllers/ClientsController"));
var clientsRouter = (0, express_1.Router)();
var clientsController = new ClientsController_1.default();
clientsRouter.use(ensureAuthenticated_1.default);
clientsRouter.post('/', clientsController.create);
clientsRouter.get('/', clientsController.list);
clientsRouter.put('/:id', clientsController.update);
clientsRouter.delete('/:id', clientsController.delete);
exports.default = clientsRouter;
