"use strict";
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
var tsyringe_1 = require("tsyringe");
var Yup = __importStar(require("yup"));
var date_fns_1 = require("date-fns");
var validateContract_1 = __importDefault(require("../libs/validateContract"));
var UpdateDataAppointmentService_1 = __importDefault(require("../services/appointments/UpdateDataAppointmentService"));
var BusyTimesRepository_1 = __importDefault(require("../repositories/BusyTimesRepository"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var TeamsRepository_1 = __importDefault(require("../repositories/TeamsRepository"));
var responseSuccess_1 = __importDefault(require("../libs/responseSuccess"));
var UpdateStatusAppointmentService_1 = __importDefault(require("../services/appointments/UpdateStatusAppointmentService"));
var CreateAppointmentService_1 = __importDefault(require("../services/appointments/CreateAppointmentService"));
var ListAppointmentService_1 = __importDefault(require("../services/appointments/ListAppointmentService"));
var CancelAppointmentService_1 = __importDefault(require("../services/appointments/CancelAppointmentService"));
var http_1 = require("../http");
var AppointmentsController = /** @class */ (function () {
    function AppointmentsController() {
    }
    AppointmentsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, userLogin, _a, module_1, client_id, date, hour, commodity_types_id, amount, team_id, doc_bl, doc_di, doc_container, obs, createAppointment, appointment, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            module: Yup.string().required(),
                            client_id: Yup.number().required(),
                            date: Yup.string().required(),
                            hour: Yup.string().required(),
                            commodity_types_id: Yup.number().required(),
                            amount: Yup.number().required(),
                            team_id: Yup.number().required(),
                            doc_bl: Yup.string(),
                            doc_di: Yup.string(),
                            doc_container: Yup.string(),
                            obs: Yup.string(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id, userLogin = user.login;
                        _a = request.body, module_1 = _a.module, client_id = _a.client_id, date = _a.date, hour = _a.hour, commodity_types_id = _a.commodity_types_id, amount = _a.amount, team_id = _a.team_id, doc_bl = _a.doc_bl, doc_di = _a.doc_di, doc_container = _a.doc_container, obs = _a.obs;
                        if (module_1 === 'spawn_module' &&
                            (doc_container === '' || !doc_container)) {
                            return [2 /*return*/, response.json({
                                    error: 'O container é obrigatório no módulo de desova',
                                    statusCode: 400,
                                })];
                        }
                        createAppointment = tsyringe_1.container.resolve(CreateAppointmentService_1.default);
                        return [4 /*yield*/, createAppointment.execute({
                                date: date,
                                hour: hour,
                                contract_id: contract_id,
                                module: module_1,
                                client_id: client_id,
                                commodity_types_id: commodity_types_id,
                                amount: amount,
                                team_id: team_id,
                                doc_bl: doc_bl,
                                doc_di: doc_di,
                                doc_container: doc_container,
                                obs: obs,
                                userLogin: userLogin,
                            })];
                    case 2:
                        appointment = _b.sent();
                        http_1.io.to("loading_module_".concat(contract_id)).emit('new_appointment', {
                            appointment: appointment,
                        });
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ appointment: appointment }))];
                    case 3:
                        error_1 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar criar um agendamento', error_1.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsController.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, listAppointments, _a, module_2, date, appointments, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            module: Yup.string().required(),
                            date: Yup.string().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.params)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        listAppointments = tsyringe_1.container.resolve(ListAppointmentService_1.default);
                        _a = request.params, module_2 = _a.module, date = _a.date;
                        return [4 /*yield*/, listAppointments.execute({
                                contract_id: contract_id,
                                module: module_2,
                                date: date,
                            })];
                    case 2:
                        appointments = _b.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ appointments: appointments }))];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar listar um agendamento', error_2.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsController.prototype.cancel = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, userId, _a, appointment_id, justify, cancelAppointmentService, appointmentUpdateded, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        schema = Yup.object().shape({
                            appointment_id: Yup.number().required(),
                            justify: Yup.string().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        console.log(user);
                        contract_id = user.contract_id, userId = user.id;
                        return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 2:
                        _b.sent();
                        _a = request.body, appointment_id = _a.appointment_id, justify = _a.justify;
                        cancelAppointmentService = tsyringe_1.container.resolve(CancelAppointmentService_1.default);
                        return [4 /*yield*/, cancelAppointmentService.execute({
                                appointment_id: appointment_id,
                                contract_id: contract_id,
                                justify: justify,
                                userId: userId,
                            })];
                    case 3:
                        appointmentUpdateded = _b.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ appointmentUpdateded: appointmentUpdateded }))];
                    case 4:
                        error_3 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar cancelar um agendamento', error_3.message))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, appointment_id, updateDataAppointmentService, data, appointmentUpdateded, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        schema = Yup.object().shape({
                            client_id: Yup.number(),
                            date: Yup.string(),
                            commodity_type: Yup.number(),
                            amount: Yup.number(),
                            team_id: Yup.number(),
                            doc_bl: Yup.string(),
                            doc_di: Yup.string(),
                            doc_container: Yup.string(),
                            obs: Yup.string(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('Falha na validação');
                        }
                        appointment_id = request.params.appointment_id;
                        updateDataAppointmentService = tsyringe_1.container.resolve(UpdateDataAppointmentService_1.default);
                        data = request.body;
                        if (data.date) {
                            data.date = (0, date_fns_1.parseISO)(data.date);
                        }
                        return [4 /*yield*/, updateDataAppointmentService.execute({
                                appointment_id: Number(appointment_id),
                                data: data,
                            })];
                    case 2:
                        appointmentUpdateded = _a.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ appointmentUpdateded: appointmentUpdateded }))];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar atualizar um agendamento', error_4.message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsController.prototype.updateStatus = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, userLogin, _a, appointmentId, statusId, updateStatusAppointmentService, appointmentUpdateded, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        schema = Yup.object().shape({
                            appointmentId: Yup.string().required(),
                            statusId: Yup.string().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.params)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id, userLogin = user.login;
                        return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 2:
                        _b.sent();
                        _a = request.params, appointmentId = _a.appointmentId, statusId = _a.statusId;
                        updateStatusAppointmentService = tsyringe_1.container.resolve(UpdateStatusAppointmentService_1.default);
                        return [4 /*yield*/, updateStatusAppointmentService.execute({
                                appointment_id: Number(appointmentId),
                                statusId: Number(statusId),
                                user: {
                                    id: user.id,
                                    login: userLogin,
                                },
                            })];
                    case 3:
                        appointmentUpdateded = _b.sent();
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ appointmentUpdateded: appointmentUpdateded }))];
                    case 4:
                        error_5 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar atualizar o status de um agendamento', error_5.message))];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsController.prototype.listAvaiableHours = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, user, contract_id, _a, module_3, date, team_id, teamsRepository, checkTeamExists, busyTimesRepository, dateHours, initHour, finalHour, busyTimes, hoursAvailable, dateHourCurrent, dateHour, _loop_1, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        schema = Yup.object().shape({
                            date: Yup.string().required(),
                            module: Yup.string().required(),
                            team_id: Yup.number().required(),
                        });
                        return [4 /*yield*/, schema.isValid(request.body)];
                    case 1:
                        if (!(_b.sent())) {
                            throw new Error('Falha na validação');
                        }
                        user = JSON.parse(request.user.id);
                        contract_id = user.contract_id;
                        return [4 /*yield*/, (0, validateContract_1.default)(contract_id)];
                    case 2:
                        _b.sent();
                        _a = request.body, module_3 = _a.module, date = _a.date, team_id = _a.team_id;
                        teamsRepository = new TeamsRepository_1.default();
                        return [4 /*yield*/, teamsRepository.findById(Number(team_id))];
                    case 3:
                        checkTeamExists = _b.sent();
                        if (!checkTeamExists) {
                            throw new Error('Id do equipe informado não encontrado.');
                        }
                        busyTimesRepository = new BusyTimesRepository_1.default();
                        return [4 /*yield*/, busyTimesRepository.findByDateTeam(Number(contract_id), (0, date_fns_1.parseISO)(date), module_3, Number(team_id))];
                    case 4:
                        dateHours = _b.sent();
                        initHour = (0, date_fns_1.parseISO)("".concat((0, date_fns_1.format)((0, date_fns_1.parseISO)(date), 'yyyy-MM-dd'), " 08:00"));
                        finalHour = (0, date_fns_1.parseISO)("".concat((0, date_fns_1.format)((0, date_fns_1.parseISO)(date), 'yyyy-MM-dd'), " 23:30"));
                        busyTimes = dateHours ? JSON.parse(dateHours === null || dateHours === void 0 ? void 0 : dateHours.busy_times) : [];
                        hoursAvailable = [];
                        dateHourCurrent = (0, date_fns_1.format)(new Date(), 'HH:mm');
                        dateHour = initHour;
                        _loop_1 = function () {
                            var formatedTime = (0, date_fns_1.format)(dateHour, 'HH:mm');
                            var findHourBusyTimes = busyTimes.find(function (hour) { return hour === formatedTime; });
                            if (!findHourBusyTimes &&
                                (formatedTime >= dateHourCurrent ||
                                    date !== (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd'))) {
                                hoursAvailable.push(formatedTime);
                            }
                            dateHour = (0, date_fns_1.addMinutes)(dateHour, 30);
                        };
                        do {
                            _loop_1();
                        } while (dateHour <= finalHour);
                        // listar horários disponíveis
                        return [2 /*return*/, response.json(new responseSuccess_1.default({ hoursAvailable: hoursAvailable }))];
                    case 5:
                        error_6 = _b.sent();
                        return [2 /*return*/, response.json(new AppError_1.default('Falha ao tentar listar horários disponíveis', error_6.message))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AppointmentsController;
}());
exports.default = AppointmentsController;
