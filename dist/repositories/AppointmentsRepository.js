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
var typeorm_1 = require("typeorm");
var Appointments_1 = __importDefault(require("../models/entities/Appointments"));
var AppointmentsRepository = /** @class */ (function () {
    function AppointmentsRepository() {
        this.ormRepository = (0, typeorm_1.getRepository)(Appointments_1.default);
    }
    AppointmentsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findAppointment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne(id)];
                    case 1:
                        findAppointment = _a.sent();
                        return [2 /*return*/, findAppointment];
                }
            });
        });
    };
    AppointmentsRepository.prototype.findByDate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var findAppointments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.manager.query("\n    SELECT AP.*, US.name as checker_name FROM appointments AS AP left join users US on AP.checker_id = US.id\n    WHERE AP.date between '".concat(data.date, " 00:00' and  '").concat(data.date, " 23:59'\n    AND AP.contract_id = ").concat(data.contract_id, "\n    AND module = '").concat(data.module, "'\n    AND status_id != 6;\n"))];
                    case 1:
                        findAppointments = _a.sent();
                        return [2 /*return*/, findAppointments];
                }
            });
        });
    };
    AppointmentsRepository.prototype.findLastCode = function (contract_id, module, date) {
        return __awaiter(this, void 0, void 0, function () {
            var findAppointments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.find({
                            select: ['code'],
                            where: {
                                contract_id: contract_id,
                                module: module,
                                date: (0, typeorm_1.Between)("".concat(date, " 00:00"), "".concat(date, " 23:59")),
                            },
                            order: {
                                id: 'DESC',
                            },
                            take: 1,
                        })];
                    case 1:
                        findAppointments = _a.sent();
                        return [2 /*return*/, findAppointments];
                }
            });
        });
    };
    AppointmentsRepository.prototype.create = function (_a) {
        var contract_id = _a.contract_id, module = _a.module, client_id = _a.client_id, date = _a.date, commodity_types_id = _a.commodity_types_id, amount = _a.amount, team_id = _a.team_id, doc_bl = _a.doc_bl, doc_di = _a.doc_di, doc_container = _a.doc_container, obs = _a.obs, code = _a.code, grid_index = _a.grid_index, status_id = _a.status_id;
        return __awaiter(this, void 0, void 0, function () {
            var appointment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        appointment = this.ormRepository.create({
                            contract_id: contract_id,
                            module: module,
                            client_id: client_id,
                            date: date,
                            commodity_types_id: commodity_types_id,
                            amount: amount,
                            team_id: team_id,
                            doc_bl: doc_bl,
                            doc_di: doc_di,
                            doc_container: doc_container,
                            obs: obs,
                            code: code,
                            grid_index: grid_index,
                            status_id: status_id,
                        });
                        return [4 /*yield*/, this.ormRepository.save(appointment)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, appointment];
                }
            });
        });
    };
    AppointmentsRepository.prototype.updateStatus = function (id, statusId, user_id) {
        if (user_id === void 0) { user_id = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var clientUpdated, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.update({
                                id: id,
                            }, {
                                status_id: statusId,
                                checker_id: user_id,
                            })];
                    case 1:
                        clientUpdated = _a.sent();
                        if (!clientUpdated) {
                            throw new Error('Não foi possível realizar o update de status');
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsRepository.prototype.update = function (id, dataUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var clientUpdated, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.update({
                                id: id,
                            }, __assign({}, dataUpdate))];
                    case 1:
                        clientUpdated = _a.sent();
                        if (!clientUpdated) {
                            throw new Error('Não foi possível realizar o update de status');
                        }
                        return [2 /*return*/, dataUpdate];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsRepository.prototype.checkStatusByTeam = function (team_id, contract_id, module) {
        return __awaiter(this, void 0, void 0, function () {
            var status_1, checkTeamStatus, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        status_1 = [0, 1, 2, 3, 4];
                        if (module === 'spawn_module') {
                            status_1 = [0, 3];
                        }
                        return [4 /*yield*/, this.ormRepository.find({
                                where: {
                                    contract_id: contract_id,
                                    team_id: team_id,
                                    module: module,
                                    status_id: (0, typeorm_1.In)(status_1),
                                },
                            })];
                    case 1:
                        checkTeamStatus = _a.sent();
                        return [2 /*return*/, checkTeamStatus];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentsRepository.prototype.checkAppointmentByUser = function (checker_id, contract_id) {
        return __awaiter(this, void 0, void 0, function () {
            var checkUserWithAppointmentActive, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.find({
                                where: {
                                    contract_id: contract_id,
                                    checker_id: checker_id,
                                    status_id: 3,
                                },
                            })];
                    case 1:
                        checkUserWithAppointmentActive = _a.sent();
                        return [2 /*return*/, checkUserWithAppointmentActive];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AppointmentsRepository;
}());
exports.default = AppointmentsRepository;
