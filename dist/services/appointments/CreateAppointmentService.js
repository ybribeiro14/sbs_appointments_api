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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var date_fns_1 = require("date-fns");
var tsyringe_1 = require("tsyringe");
var validateContract_1 = __importDefault(require("../../libs/validateContract"));
var calculateGridIndex_1 = __importDefault(require("../../libs/calculateGridIndex"));
var generateTimesNeeds_1 = __importDefault(require("../../libs/generateTimesNeeds"));
var TeamsRepository_1 = __importDefault(require("../../repositories/TeamsRepository"));
var ClientsRepository_1 = __importDefault(require("../../repositories/ClientsRepository"));
var checkTimeAvailable_1 = __importDefault(require("../../libs/checkTimeAvailable"));
var BusyTimesRepository_1 = __importDefault(require("../../repositories/BusyTimesRepository"));
var AppointmentsStatusRepository_1 = __importDefault(require("../../repositories/AppointmentsStatusRepository"));
var CreateAppointmentService = /** @class */ (function () {
    function CreateAppointmentService(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    CreateAppointmentService.prototype.execute = function (_a) {
        var contract_id = _a.contract_id, module = _a.module, client_id = _a.client_id, date = _a.date, hour = _a.hour, commodity_types_id = _a.commodity_types_id, amount = _a.amount, team_id = _a.team_id, doc_bl = _a.doc_bl, doc_di = _a.doc_di, doc_container = _a.doc_container, obs = _a.obs, userLogin = _a.userLogin;
        return __awaiter(this, void 0, void 0, function () {
            var parsedDate, parsedDateTime, teamsRepository, checkTeam, clientsRepository, checkClient, _b, grids, commodityType, timesGridsNeeds, busyTimesRepository, checkTime, lastCode, numberNextAppointment, code, appointmentsStatusRepository, appointment, busyUpdated, dateStatus, status, status_history;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 1:
                        _c.sent();
                        parsedDate = (0, date_fns_1.parseISO)(date);
                        parsedDateTime = (0, date_fns_1.parseISO)("".concat(date, " ").concat(hour));
                        // Verificar se é data que já passou
                        if ((0, date_fns_1.isBefore)(parsedDateTime, new Date())) {
                            throw new Error('Data informada não permitida.');
                        }
                        teamsRepository = new TeamsRepository_1.default();
                        return [4 /*yield*/, teamsRepository.findById(team_id)];
                    case 2:
                        checkTeam = _c.sent();
                        if (!checkTeam) {
                            throw new Error('Equipe informada não existe');
                        }
                        if (module === 'loading_module' && !checkTeam.loading_module) {
                            throw new Error('Equipe informada não está habilitada para carregamento');
                        }
                        else if (module === 'spawn_module' && !checkTeam.spawn_module) {
                            throw new Error('Equipe informada não está habilitada para desova');
                        }
                        clientsRepository = new ClientsRepository_1.default();
                        return [4 /*yield*/, clientsRepository.findById(client_id)];
                    case 3:
                        checkClient = _c.sent();
                        if (!checkClient) {
                            throw new Error('Cliente informado não existe!');
                        }
                        return [4 /*yield*/, (0, calculateGridIndex_1.default)({
                                amount: amount,
                                commodity_types_id: commodity_types_id,
                            })];
                    case 4:
                        _b = _c.sent(), grids = _b.grids, commodityType = _b.commodityType;
                        timesGridsNeeds = (0, generateTimesNeeds_1.default)(parsedDateTime, grids);
                        busyTimesRepository = new BusyTimesRepository_1.default();
                        return [4 /*yield*/, (0, checkTimeAvailable_1.default)({
                                contract_id: contract_id,
                                module: module,
                                parsedDate: parsedDate,
                                team_id: team_id,
                                timesGridsNeeds: timesGridsNeeds,
                            })];
                    case 5:
                        checkTime = _c.sent();
                        if (!checkTime.busyTimes.length) {
                            throw new Error('Não foi possível gerar este agendamento.');
                        }
                        return [4 /*yield*/, this.appointmentsRepository.findLastCode(Number(contract_id), module, date)];
                    case 6:
                        lastCode = _c.sent();
                        numberNextAppointment = !(lastCode === null || lastCode === void 0 ? void 0 : lastCode.length)
                            ? 1
                            : Number(lastCode[0].code.slice(lastCode[0].code.length - 2)) + 1;
                        code = "".concat(module === 'loading_module' ? 'C' : 'D').concat(contract_id).concat((0, date_fns_1.format)(parsedDateTime, 'ddMMyyyy')).concat(numberNextAppointment < 10
                            ? "0".concat(numberNextAppointment)
                            : numberNextAppointment);
                        appointmentsStatusRepository = new AppointmentsStatusRepository_1.default();
                        return [4 /*yield*/, this.appointmentsRepository.create({
                                contract_id: contract_id,
                                module: module,
                                client_id: client_id,
                                date: parsedDateTime,
                                commodity_types_id: commodity_types_id,
                                amount: amount,
                                team_id: team_id,
                                doc_bl: doc_bl,
                                doc_di: doc_di,
                                doc_container: doc_container,
                                obs: obs,
                                status_id: 0,
                                grid_index: grids,
                                code: code,
                            })];
                    case 7:
                        appointment = _c.sent();
                        if (!checkTime.idBusyTimes) return [3 /*break*/, 9];
                        return [4 /*yield*/, busyTimesRepository.update(checkTime.idBusyTimes, JSON.stringify(checkTime.busyTimes))];
                    case 8:
                        busyUpdated = _c.sent();
                        if (!busyUpdated) {
                            throw new Error('Erro ao tentar atualizar a lista de horários ocupados.');
                        }
                        _c.label = 9;
                    case 9:
                        dateStatus = new Date();
                        status = [
                            {
                                status: 'scheduled',
                                timestamp: (0, date_fns_1.getTime)(dateStatus),
                                date_formated: (0, date_fns_1.format)(dateStatus, 'dd/MM/yyyy HH:mm'),
                                user: userLogin,
                            },
                        ];
                        return [4 /*yield*/, appointmentsStatusRepository.create({
                                appointment_id: appointment.id,
                                code: code,
                                contract_id: contract_id,
                                module: module,
                                status_history: JSON.stringify(status),
                            })];
                    case 10:
                        status_history = (_c.sent()).status_history;
                        return [2 /*return*/, __assign(__assign({}, appointment), { clientData: checkClient, commodityTypeData: commodityType, statusHistory: JSON.parse(status_history) })];
                }
            });
        });
    };
    CreateAppointmentService = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)('AppointmentsRepository')),
        __metadata("design:paramtypes", [Object])
    ], CreateAppointmentService);
    return CreateAppointmentService;
}());
exports.default = CreateAppointmentService;
