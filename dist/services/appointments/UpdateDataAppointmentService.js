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
var calculateGridIndex_1 = __importDefault(require("../../libs/calculateGridIndex"));
var generateTimesNeeds_1 = __importDefault(require("../../libs/generateTimesNeeds"));
var checkTimeAvailable_1 = __importDefault(require("../../libs/checkTimeAvailable"));
var BusyTimesRepository_1 = __importDefault(require("../../repositories/BusyTimesRepository"));
var UpdateDataAppointmentService = /** @class */ (function () {
    function UpdateDataAppointmentService(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    UpdateDataAppointmentService.prototype.execute = function (_a) {
        var appointment_id = _a.appointment_id, data = _a.data;
        return __awaiter(this, void 0, void 0, function () {
            var appointment, checkBusyTimes, newAppointment, grids, newBusyTimes, idBusyTimes, busyTimesRepository, timesGridsNeeds, oldBusyTime, listBusyTimesOld, time, _loop_1, index, busyUpdatedOld, checkTime, appointmentUpdated, busyUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.appointmentsRepository.findById(appointment_id)];
                    case 1:
                        appointment = _b.sent();
                        if (!appointment) {
                            throw new Error('Agendamento informado não existe.');
                        }
                        if (appointment.status_id === 6) {
                            throw new Error('Não é permitido alterar um agendamento que já está cancelado.');
                        }
                        // agendamento já iniciado
                        if (appointment.status_id >= 3) {
                            throw new Error('Não é permitido alterar um agendamento que já foi iniciado.');
                        }
                        if (data.date) {
                            // Verificar se é data que já passou
                            if ((0, date_fns_1.isBefore)(data.date, new Date())) {
                                throw new Error('Data informada já passou!');
                            }
                        }
                        checkBusyTimes = false;
                        newAppointment = __assign(__assign({}, appointment), data);
                        if (!(data.commodity_type || data.amount)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, calculateGridIndex_1.default)({
                                amount: newAppointment.amount,
                                commodity_types_id: newAppointment.commodity_types_id,
                            })];
                    case 2:
                        grids = (_b.sent()).grids;
                        newAppointment.grid_index = grids;
                        checkBusyTimes = true;
                        _b.label = 3;
                    case 3:
                        newBusyTimes = [];
                        busyTimesRepository = new BusyTimesRepository_1.default();
                        if (!(checkBusyTimes || data.team_id || data.date)) return [3 /*break*/, 8];
                        timesGridsNeeds = (0, generateTimesNeeds_1.default)(newAppointment.date, newAppointment.grid_index);
                        return [4 /*yield*/, busyTimesRepository.findByDateTeam(appointment.contract_id, (0, date_fns_1.parseISO)((0, date_fns_1.format)(appointment.date, 'yyyy-MM-dd')), appointment.module, appointment.team_id)];
                    case 4:
                        oldBusyTime = _b.sent();
                        if (!oldBusyTime) return [3 /*break*/, 6];
                        listBusyTimesOld = JSON.parse(oldBusyTime === null || oldBusyTime === void 0 ? void 0 : oldBusyTime.busy_times);
                        time = appointment.date;
                        _loop_1 = function (index) {
                            var formatedTime = (0, date_fns_1.format)(time, 'HH:mm');
                            var indexHour = listBusyTimesOld.findIndex(function (hour) { return hour === formatedTime; });
                            if (indexHour >= 0) {
                                listBusyTimesOld.splice(indexHour, 1);
                            }
                            time = (0, date_fns_1.addMinutes)(time, 30);
                        };
                        for (index = 0; index < appointment.grid_index; index++) {
                            _loop_1(index);
                        }
                        return [4 /*yield*/, busyTimesRepository.update(oldBusyTime === null || oldBusyTime === void 0 ? void 0 : oldBusyTime.id, JSON.stringify(listBusyTimesOld))];
                    case 5:
                        busyUpdatedOld = _b.sent();
                        if (!busyUpdatedOld) {
                            throw new Error('Erro ao tentar atualizar a lista de horários ocupados anteriores.');
                        }
                        _b.label = 6;
                    case 6: return [4 /*yield*/, (0, checkTimeAvailable_1.default)({
                            contract_id: newAppointment.contract_id,
                            module: newAppointment.module,
                            parsedDate: (0, date_fns_1.parseISO)((0, date_fns_1.format)(newAppointment.date, 'yyyy-MM-dd')),
                            team_id: newAppointment.team_id,
                            timesGridsNeeds: timesGridsNeeds,
                        })];
                    case 7:
                        checkTime = _b.sent();
                        if (!checkTime.busyTimes.length) {
                            throw new Error('Não foi possível alterar este agendamento.');
                        }
                        newBusyTimes = checkTime.busyTimes;
                        idBusyTimes = checkTime.idBusyTimes;
                        _b.label = 8;
                    case 8: return [4 /*yield*/, this.appointmentsRepository.update(newAppointment.id, newAppointment)];
                    case 9:
                        appointmentUpdated = _b.sent();
                        if (!idBusyTimes) return [3 /*break*/, 11];
                        return [4 /*yield*/, busyTimesRepository.update(idBusyTimes, JSON.stringify(newBusyTimes))];
                    case 10:
                        busyUpdated = _b.sent();
                        if (!busyUpdated) {
                            throw new Error('Erro ao tentar atualizar a lista de horários ocupados.');
                        }
                        _b.label = 11;
                    case 11: return [2 /*return*/, appointmentUpdated];
                }
            });
        });
    };
    UpdateDataAppointmentService = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)('AppointmentsRepository')),
        __metadata("design:paramtypes", [Object])
    ], UpdateDataAppointmentService);
    return UpdateDataAppointmentService;
}());
exports.default = UpdateDataAppointmentService;
