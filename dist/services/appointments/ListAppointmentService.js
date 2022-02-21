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
var BusyTimesRepository_1 = __importDefault(require("../../repositories/BusyTimesRepository"));
var TeamsRepository_1 = __importDefault(require("../../repositories/TeamsRepository"));
var ClientsRepository_1 = __importDefault(require("../../repositories/ClientsRepository"));
var CommodityTypesRepository_1 = __importDefault(require("../../repositories/CommodityTypesRepository"));
var AppointmentsStatusRepository_1 = __importDefault(require("../../repositories/AppointmentsStatusRepository"));
var ListAppointmentService = /** @class */ (function () {
    function ListAppointmentService(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    ListAppointmentService.prototype.execute = function (_a) {
        var contract_id = _a.contract_id, module = _a.module, date = _a.date;
        return __awaiter(this, void 0, void 0, function () {
            var busyTimesRepository, teamsRepository, clientsRepository, commodityTypesRepository, appointmentsStatusRepository, clients, types, parsedDate, busyTimesHash, teamsEnebled, appoitments, appointmentsByTeam;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        busyTimesRepository = new BusyTimesRepository_1.default();
                        teamsRepository = new TeamsRepository_1.default();
                        clientsRepository = new ClientsRepository_1.default();
                        commodityTypesRepository = new CommodityTypesRepository_1.default();
                        appointmentsStatusRepository = new AppointmentsStatusRepository_1.default();
                        return [4 /*yield*/, clientsRepository.list(contract_id)];
                    case 1:
                        clients = _b.sent();
                        return [4 /*yield*/, commodityTypesRepository.list(contract_id)];
                    case 2:
                        types = _b.sent();
                        parsedDate = (0, date_fns_1.parseISO)(date);
                        return [4 /*yield*/, busyTimesRepository.findByDate(contract_id, module, parsedDate)];
                    case 3:
                        busyTimesHash = _b.sent();
                        return [4 /*yield*/, teamsRepository.findEnebled(contract_id, module)];
                    case 4:
                        teamsEnebled = _b.sent();
                        if (teamsEnebled === null || teamsEnebled === void 0 ? void 0 : teamsEnebled.length) {
                            teamsEnebled.forEach(function (team) { return __awaiter(_this, void 0, void 0, function () {
                                var busyTimeFind;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            busyTimeFind = busyTimesHash === null || busyTimesHash === void 0 ? void 0 : busyTimesHash.find(function (time) { return time.team_id === team.id; });
                                            if (!!busyTimeFind) return [3 /*break*/, 2];
                                            return [4 /*yield*/, busyTimesRepository.create({
                                                    busy_times: JSON.stringify([]),
                                                    module: module,
                                                    contract_id: contract_id,
                                                    date: parsedDate,
                                                    team_id: team.id,
                                                })];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            throw new Error('Não existe nenhuma equipe habilitada para este contrato');
                        }
                        return [4 /*yield*/, this.appointmentsRepository.findByDate({
                                contract_id: contract_id,
                                module: module,
                                date: date,
                            })];
                    case 5:
                        appoitments = _b.sent();
                        appointmentsByTeam = {};
                        if (!appoitments) return [3 /*break*/, 7];
                        return [4 /*yield*/, Promise.all(appoitments.map(function (appoitment) { return __awaiter(_this, void 0, void 0, function () {
                                var statusHistory, history;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, appointmentsStatusRepository.findById(appoitment.id)];
                                        case 1:
                                            statusHistory = _a.sent();
                                            history = {};
                                            if (statusHistory) {
                                                history = JSON.parse(statusHistory === null || statusHistory === void 0 ? void 0 : statusHistory.status_history);
                                            }
                                            if (appointmentsByTeam[String(appoitment.team_id)]) {
                                                appointmentsByTeam[String(appoitment.team_id)].push(__assign(__assign({}, appoitment), { clientData: clients.find(function (client) { return client.id === appoitment.client_id; }), commodityTypeData: types.find(function (type) { return type.id === appoitment.commodity_types_id; }), statusHistory: history }));
                                            }
                                            else {
                                                appointmentsByTeam[String(appoitment.team_id)] = [
                                                    __assign(__assign({}, appoitment), { clientData: clients.find(function (client) { return client.id === appoitment.client_id; }), commodityTypeData: types.find(function (type) { return type.id === appoitment.commodity_types_id; }), statusHistory: history }),
                                                ];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/, appointmentsByTeam];
                }
            });
        });
    };
    ListAppointmentService = __decorate([
        (0, tsyringe_1.injectable)(),
        __param(0, (0, tsyringe_1.inject)('AppointmentsRepository')),
        __metadata("design:paramtypes", [Object])
    ], ListAppointmentService);
    return ListAppointmentService;
}());
exports.default = ListAppointmentService;
