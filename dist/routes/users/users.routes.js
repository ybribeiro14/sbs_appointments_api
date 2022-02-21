"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersController_1 = __importDefault(require("../../controllers/UsersController"));
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var usersController = new UsersController_1.default();
var usersRouter = (0, express_1.Router)();
usersRouter.use(ensureAuthenticated_1.default);
usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.list);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);
exports.default = usersRouter;
