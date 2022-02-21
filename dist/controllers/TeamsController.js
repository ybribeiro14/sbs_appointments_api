"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Yup = __importStar(require("yup"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var responseSuccess_1 = __importDefault(require("../libs/responseSuccess"));
var validateContract_1 = __importDefault(require("../libs/validateContract"));
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var TeamsRepository_1 = __importDefault(require("../repositories/TeamsRepository"));
var TeamsController = /** @class */ (function () {
    function TeamsController() {
    }
    TeamsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, name_1, teamsRepository, commodityTypeExist, team, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        schema = Yup.object().shape({
                            name: Yup.string().required(),
                            loading_module: Yup.boolean().required(),
                            spawn_module: Yup.boolean().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        name_1 = request.body.name;
                        return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 2:
                        _a.sent();
                        teamsRepository = new TeamsRepository_1.default();
                        return [4 /*yield*/, teamsRepository.findByName(name_1, contract_id)];
                    case 3:
                        commodityTypeExist = _a.sent();
                        if (commodityTypeExist) {
                            throw new Error('Já existe um time com este nome.');
                        }
                        return [4 /*yield*/, teamsRepository.create(__assign(__assign({}, request.body), { contract_id: contract_id }))];
                    case 4:
                        team = _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ team: team }))];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar criar uma equipe', error_1.message))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TeamsController.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var teamsRepository, user, contract_id, teams, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        teamsRepository = new TeamsRepository_1.default();
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        return [4 /*yield*/, teamsRepository.list(contract_id)];
                    case 1:
                        teams = _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ teams: teams }))];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar listar uma equipe', error_2.message))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeamsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var paramsValidation, schema, user, contract_id, teamsRepository, id, checkTeamExists, appoitmentsRepository, checkTeamAppointmentEnable, checkTeamAppointmentEnable, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        paramsValidation = {
                            id: request.params.id,
                            loading_module: request.body.loading_module,
                            spawn_module: request.body.spawn_module,
                        };
                        schema = Yup.object().shape({
                            id: Yup.number().required(),
                            loading_module: Yup.boolean().required(),
                            spawn_module: Yup.boolean().required(),
                        });
                        return [4 /*yield*/, schema.isValid(paramsValidation)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 2:
                        _a.sent();
                        teamsRepository = new TeamsRepository_1.default();
                        id = request.params.id;
                        return [4 /*yield*/, teamsRepository.findById(Number(id))];
                    case 3:
                        checkTeamExists = _a.sent();
                        if (!checkTeamExists) {
                            throw new Error('ID da equipe informado não foi encontrado.');
                        }
                        appoitmentsRepository = new AppointmentsRepository_1.default();
                        if (!!request.body.loading_module) return [3 /*break*/, 5];
                        return [4 /*yield*/, appoitmentsRepository.checkStatusByTeam(Number(id), contract_id, 'loading_module')];
                    case 4:
                        checkTeamAppointmentEnable = _a.sent();
                        console.log(checkTeamAppointmentEnable);
                        if (checkTeamAppointmentEnable.length) {
                            throw new Error('Não é permitido desabilitar essa equipe por que ela possui um carregamento em aberto.');
                        }
                        _a.label = 5;
                    case 5:
                        if (!!request.body.spawn_module) return [3 /*break*/, 7];
                        return [4 /*yield*/, appoitmentsRepository.checkStatusByTeam(Number(id), contract_id, 'spawn_module')];
                    case 6:
                        checkTeamAppointmentEnable = _a.sent();
                        if (checkTeamAppointmentEnable.length) {
                            throw new Error('Não é permitido desabilitar essa equipe por que ela possui uma desova em aberto.');
                        }
                        _a.label = 7;
                    case 7: return [4 /*yield*/, teamsRepository.update(__assign({ id: Number(id) }, request.body))];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({
                                message: 'Equipe atualizada com sucesso',
                            }))];
                    case 9:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar atualizar uma equipe', error_3.message))];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    TeamsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, teamsRepository, id, checkTeamExists, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        schema = Yup.object().shape({
                            id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.params)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        teamsRepository = new TeamsRepository_1.default();
                        id = request.params.id;
                        return [4 /*yield*/, teamsRepository.findById(Number(id))];
                    case 2:
                        checkTeamExists = _a.sent();
                        if (!checkTeamExists) {
                            throw new Error('Id equipe informado não encontrado.');
                        }
                        return [4 /*yield*/, teamsRepository.delete(Number(id))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({
                                message: 'Equipe deletada com sucesso',
                            }))];
                    case 4:
                        error_4 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar deletar uma equipe', error_4.message))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TeamsController;
}());
exports.default = TeamsController;
