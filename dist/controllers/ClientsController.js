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
var responseSuccess_1 = __importDefault(require("../libs/responseSuccess"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var validateContract_1 = __importDefault(require("../libs/validateContract"));
var ClientsRepository_1 = __importDefault(require("../repositories/ClientsRepository"));
var ClientsController = /** @class */ (function () {
    function ClientsController() {
    }
    ClientsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, _a, name_1, cnpj, clientsRepository, clientExist, client, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        schema = Yup.object().shape({
                            name: Yup.string().required(),
                            cnpj: Yup.string().min(18).max(18).required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        _a = request.body, name_1 = _a.name, cnpj = _a.cnpj;
                        return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 2:
                        _b.sent();
                        clientsRepository = new ClientsRepository_1.default();
                        return [4 /*yield*/, clientsRepository.findByCnpj(cnpj)];
                    case 3:
                        clientExist = _b.sent();
                        if (clientExist) {
                            throw new Error('Cliente já existe.');
                        }
                        return [4 /*yield*/, clientsRepository.create({
                                name: name_1,
                                cnpj: cnpj,
                                contract_id: contract_id,
                            })];
                    case 4:
                        client = _b.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ client: client }))];
                    case 5:
                        error_1 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar criar um cliente', error_1.message))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ClientsController.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var clientsRepository, user, contract_id, clients, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        clientsRepository = new ClientsRepository_1.default();
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        return [4 /*yield*/, clientsRepository.list(contract_id)];
                    case 1:
                        clients = _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ clients: clients }))];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar listar um cliente', error_2.message))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClientsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var paramsValidation, schema, clientsRepository, id, checkClientExists, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        paramsValidation = {
                            id: request.params.id,
                            name: request.body.name,
                        };
                        schema = Yup.object().shape({
                            id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(paramsValidation)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        clientsRepository = new ClientsRepository_1.default();
                        id = request.params.id;
                        return [4 /*yield*/, clientsRepository.findById(Number(id))];
                    case 2:
                        checkClientExists = _a.sent();
                        if (!checkClientExists) {
                            throw new Error('ID cliente informado não encontrado.');
                        }
                        return [4 /*yield*/, clientsRepository.update(__assign({ id: Number(id) }, request.body))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({
                                message: 'Cliente atualizado com sucesso',
                            }))];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar atualizar um cliente', error_3.message))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClientsController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, clientsRepository, id, checkClientExists, error_4;
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
                        clientsRepository = new ClientsRepository_1.default();
                        id = request.params.id;
                        return [4 /*yield*/, clientsRepository.findById(Number(id))];
                    case 2:
                        checkClientExists = _a.sent();
                        if (!checkClientExists) {
                            throw new Error('Id cliente informado não encontrado.');
                        }
                        return [4 /*yield*/, clientsRepository.delete(Number(id))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({
                                message: 'Cliente deletado com sucesso',
                            }))];
                    case 4:
                        error_4 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar deletar um cliente', error_4.message))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ClientsController;
}());
exports.default = ClientsController;
