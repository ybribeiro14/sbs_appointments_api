"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var CommodityTypesController_1 = __importDefault(require("../../controllers/CommodityTypesController"));
var commodityTypesRouter = (0, express_1.Router)();
var commodityTypesController = new CommodityTypesController_1.default();
commodityTypesRouter.use(ensureAuthenticated_1.default);
commodityTypesRouter.post('/', commodityTypesController.create);
commodityTypesRouter.get('/', commodityTypesController.list);
commodityTypesRouter.put('/:id', commodityTypesController.update);
commodityTypesRouter.delete('/:id', commodityTypesController.delete);
exports.default = commodityTypesRouter;
