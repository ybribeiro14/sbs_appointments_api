"use strict";
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
var enums_1 = require("../../libs/enums");
var AppointmentsStatusRepository_1 = __importDefault(require("../../repositories/AppointmentsStatusRepository"));
var http_1 = require("../../http");
var UpdateStatusAppointmentService = /** @class */ (function () {
    function UpdateStatusAppointmentService(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    UpdateStatusAppointmentService.prototype.execute = function (_a) {
        var appointment_id = _a.appointment_id, statusId = _a.statusId, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var appointment, previousStatus, checker_id, typeNewStatus, statusLoadindModule, statusSpawnModule, appointmentsStatusRepository, hashStatus, statusHistory, dateStatus, status;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.appointmentsRepository.findById(appointment_id)];
                    case 1:
                        appointment = _b.sent();
                        if (!appointment) {
                            throw new Error('Agendamento informado não existe.');
                        }
                        previousStatus = appointment.status_id;
                        if (appointment.module === 'loading_module') {
                            statusLoadindModule = Object.values(enums_1.enum_status_loadind_module);
                            typeNewStatus = statusLoadindModule.find(function (stat) { return stat.id === statusId; });
                            switch (statusId) {
                                case enums_1.enum_status_loadind_module.TRUCK_ARRIVED.id:
                                    if (previousStatus !== enums_1.enum_status_loadind_module.SCHEDULED.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_loadind_module.TRUCK_ENTERED.id:
                                    if (previousStatus !== enums_1.enum_status_loadind_module.TRUCK_ARRIVED.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_loadind_module.LOADING_STARTED.id:
                                    checker_id = user.id;
                                    if (previousStatus !== enums_1.enum_status_loadind_module.TRUCK_ENTERED.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_loadind_module.FINISHED_LOADING.id:
                                    if (previousStatus !== enums_1.enum_status_loadind_module.LOADING_STARTED.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_loadind_module.TRUCK_DISPATCHED.id:
                                    if (previousStatus !== enums_1.enum_status_loadind_module.FINISHED_LOADING.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_loadind_module.CANCELED.id:
                                    throw new Error('Agendamento cancelado não permite alteração.');
                                default:
                                    throw new Error('Status informado não existe.');
                            }
                        }
                        else {
                            statusSpawnModule = Object.values(enums_1.enum_status_spawn_module);
                            typeNewStatus = statusSpawnModule.find(function (stat) { return stat.id === statusId; });
                            switch (statusId) {
                                case enums_1.enum_status_spawn_module.SPAWN_STARTED.id:
                                    checker_id = user.id;
                                    if (previousStatus !== enums_1.enum_status_spawn_module.SCHEDULED.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_spawn_module.FINISHED_SPAWN.id:
                                    if (previousStatus !== enums_1.enum_status_spawn_module.SPAWN_STARTED.id) {
                                        throw new Error('Status atual não permite alterar para o status informado.');
                                    }
                                    break;
                                case enums_1.enum_status_spawn_module.CANCELED.id:
                                    throw new Error('Agendamento cancelado não permite alteração.');
                                default:
                                    throw new Error('Status informado não existe.');
                            }
                        }
                        appointmentsStatusRepository = new AppointmentsStatusRepository_1.default();
                        return [4 /*yield*/, appointmentsStatusRepository.findById(appointment_id)];
                    case 2:
                        hashStatus = _b.sent();
                        if (!hashStatus) {
                            throw new Error('Não foi possível realizar a atualização de Status. Hash não encontrado');
                        }
                        statusHistory = JSON.parse(hashStatus.status_history);
                        dateStatus = new Date();
                        status = {
                            status: typeNewStatus === null || typeNewStatus === void 0 ? void 0 : typeNewStatus.type,
                            timestamp: (0, date_fns_1.getTime)(dateStatus),
                            date_formated: (0, date_fns_1.format)(dateStatus, 'dd/MM/yyyy HH:mm'),
                            user: user.login,
                        };
                        statusHistory.push(status);
                        return [4 /*yield*/, appointmentsStatusRepository.update(hashStatus.id, JSON.stringify(statusHistory))];
                    case 3:
                        _b.sent();
                        // Atualizar status na tabela;
                        return [4 /*yield*/, this.appointmentsRepository.updateStatus(appointment.id, statusId, checker_id)];
                    case 4:
                        // Atualizar status na tabela;
                        _b.sent();
                        http_1.io.to("loading_module_".concat(appointment.contract_id)).emit('update_appointment', {
                            module: appointment.module,
                            date: appointment.date,
                        });
                        return [2 /*return*/, statusHistory];
                }
            });
        });
    };
    UpdateStatusAppointmentService = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)('AppointmentsRepository')),
        __metadata("design:paramtypes", [Object])
    ], UpdateStatusAppointmentService);
    return UpdateStatusAppointmentService;
}());
exports.default = UpdateStatusAppointmentService;
