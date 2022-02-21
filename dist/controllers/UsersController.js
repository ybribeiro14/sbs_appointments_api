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
var tsyringe_1 = require("tsyringe");
var bcryptjs_1 = require("bcryptjs");
var AppError_1 = __importDefault(require("../errors/AppError"));
var responseSuccess_1 = __importDefault(require("../libs/responseSuccess"));
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var CreateUserService_1 = __importDefault(require("../services/users/CreateUserService"));
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, userRequest, contract_id, _a, name_1, login, password, permission_id, spawn_module, loading_module, inventory_module, painel_adm, concierge, checker, supervisor, createUser, user, userWithoutPassword, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            name: Yup.string().required(),
                            login: Yup.string().required(),
                            password: Yup.string().required(),
                            painel_adm: Yup.boolean().required(),
                            concierge: Yup.boolean().required(),
                            checker: Yup.boolean().required(),
                            supervisor: Yup.boolean().required(),
                            spawn_module: Yup.boolean().required(),
                            loading_module: Yup.boolean().required(),
                            inventory_module: Yup.boolean().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        userRequest = JSON.parse(request.user.id);
                        contract_id = userRequest.contract_id;
                        _a = request.body, name_1 = _a.name, login = _a.login, password = _a.password, permission_id = _a.permission_id, spawn_module = _a.spawn_module, loading_module = _a.loading_module, inventory_module = _a.inventory_module, painel_adm = _a.painel_adm, concierge = _a.concierge, checker = _a.checker, supervisor = _a.supervisor;
                        createUser = tsyringe_1.container.resolve(CreateUserService_1.default);
                        return [4 /*yield*/, createUser.execute({
                                name: name_1,
                                login: login,
                                password: password,
                                contract_id: contract_id,
                                permission_id: permission_id,
                                spawn_module: spawn_module,
                                loading_module: loading_module,
                                inventory_module: inventory_module,
                                painel_adm: painel_adm,
                                concierge: concierge,
                                checker: checker,
                                supervisor: supervisor,
                            })];
                    case 2:
                        user = _b.sent();
                        userWithoutPassword = {
                            id: user.id,
                            name: user.name,
                            login: user.login,
                            contract_id: user.contract_id,
                            created_at: user.created_at,
                            updated_at: user.updated_at,
                            spawn_module: user.spawn_module,
                            loading_module: user.loading_module,
                            inventory_module: user.inventory_module,
                            painel_adm: user.painel_adm,
                            concierge: user.concierge,
                            checker: user.checker,
                            supervisor: user.supervisor,
                        };
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ user: userWithoutPassword }))];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar criar um usuário', error_1.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepository, userRequest, contract_id, users, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        usersRepository = new UsersRepository_1.default();
                        userRequest = JSON.parse(request.user.id);
                        contract_id = userRequest.contract_id;
                        return [4 /*yield*/, usersRepository.list(contract_id)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ users: users }))];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar listar usuários', error_2.message))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, usersRepository, id, checkUserExists, hashedPassword, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        schema = Yup.object().shape({
                            id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.params)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        usersRepository = new UsersRepository_1.default();
                        id = request.params.id;
                        return [4 /*yield*/, usersRepository.findById(Number(id))];
                    case 2:
                        checkUserExists = _a.sent();
                        if (!checkUserExists) {
                            throw new Error('Id usuário informado não encontrado.');
                        }
                        hashedPassword = void 0;
                        if (!(request.body.password !== '')) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, bcryptjs_1.hash)(request.body.password, 8)];
                    case 3:
                        hashedPassword = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, usersRepository.update(Number(id), __assign(__assign({}, request.body), { password: hashedPassword }))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({
                                message: 'Usuário atualizado com sucesso',
                            }))];
                    case 6:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar atualizar um usuário', error_3.message))];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, usersRepository, id, checkUserExists, appoitmentsRepository, checkUserWithAppointmentActive, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        schema = Yup.object().shape({
                            id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.params)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        usersRepository = new UsersRepository_1.default();
                        id = request.params.id;
                        return [4 /*yield*/, usersRepository.findById(Number(id))];
                    case 2:
                        checkUserExists = _a.sent();
                        if (!checkUserExists) {
                            throw new Error('Id usuário informado não encontrado.');
                        }
                        if (!checkUserExists.checker) return [3 /*break*/, 4];
                        appoitmentsRepository = new AppointmentsRepository_1.default();
                        return [4 /*yield*/, appoitmentsRepository.checkAppointmentByUser(Number(id), contract_id)];
                    case 3:
                        checkUserWithAppointmentActive = _a.sent();
                        if (checkUserWithAppointmentActive) {
                            throw new Error('Não é permitido excluir conferente com agendamento em aberto.');
                        }
                        _a.label = 4;
                    case 4: return [4 /*yield*/, usersRepository.delete(Number(id))];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({
                                message: 'Usuário deletado com sucesso',
                            }))];
                    case 6:
                        error_4 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar deletar um usuário', error_4.message))];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
