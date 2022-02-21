"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ContractsController_1 = __importDefault(require("../../controllers/ContractsController"));
var contractsRouter = (0, express_1.Router)();
var contractsController = new ContractsController_1.default();
contractsRouter.post('/', contractsController.create);
contractsRouter.get('/', contractsController.list);
contractsRouter.delete('/:id', contractsController.delete);
exports.default = contractsRouter;
