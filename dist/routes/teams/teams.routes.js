"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("../../middlewares/ensureAuthenticated"));
var TeamsController_1 = __importDefault(require("../../controllers/TeamsController"));
var teamsRouter = (0, express_1.Router)();
var teamsController = new TeamsController_1.default();
teamsRouter.use(ensureAuthenticated_1.default);
teamsRouter.post('/', teamsController.create);
teamsRouter.get('/', teamsController.list);
teamsRouter.put('/:id', teamsController.update);
teamsRouter.delete('/:id', teamsController.delete);
exports.default = teamsRouter;
