"use strict";
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
var Teams_1 = __importDefault(require("../models/entities/Teams"));
var TeamsRepository = /** @class */ (function () {
    function TeamsRepository() {
        this.ormRepository = (0, typeorm_1.getRepository)(Teams_1.default);
    }
    TeamsRepository.prototype.findByName = function (name, contract_id) {
        return __awaiter(this, void 0, void 0, function () {
            var findTeam, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.findOne({
                                where: {
                                    name: name,
                                    contract_id: contract_id,
                                },
                            })];
                    case 1:
                        findTeam = _a.sent();
                        return [2 /*return*/, findTeam];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeamsRepository.prototype.findEnebled = function (contract_id, module) {
        return __awaiter(this, void 0, void 0, function () {
            var whereConditions, findTeams, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        whereConditions = {
                            contract_id: contract_id,
                        };
                        if (module === 'loading_module') {
                            whereConditions.loading_module = true;
                        }
                        if (module === 'spawn_module') {
                            whereConditions.spawn_module = true;
                        }
                        return [4 /*yield*/, this.ormRepository.find({
                                where: whereConditions,
                            })];
                    case 1:
                        findTeams = _a.sent();
                        return [2 /*return*/, findTeams];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeamsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findTeam, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.findOne(id)];
                    case 1:
                        findTeam = _a.sent();
                        return [2 /*return*/, findTeam];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeamsRepository.prototype.create = function (teamsData) {
        return __awaiter(this, void 0, void 0, function () {
            var teams, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        teams = this.ormRepository.create(teamsData);
                        return [4 /*yield*/, this.ormRepository.save(teams)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, teams];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeamsRepository.prototype.save = function (teams) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.ormRepository.save(teams)];
                }
                catch (error) {
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    TeamsRepository.prototype.list = function (contract_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.ormRepository.find({
                            where: {
                                contract_id: contract_id,
                            },
                        })];
                }
                catch (error) {
                    throw new Error(error.message);
                }
                return [2 /*return*/];
            });
        });
    };
    TeamsRepository.prototype.update = function (teams) {
        return __awaiter(this, void 0, void 0, function () {
            var teamsUpdated, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.update({
                                id: teams.id,
                            }, {
                                loading_module: teams.loading_module,
                                spawn_module: teams.spawn_module,
                            })];
                    case 1:
                        teamsUpdated = _a.sent();
                        if (!teamsUpdated) {
                            throw new Error('Não foi possível realizar o update');
                        }
                        return [2 /*return*/, true];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TeamsRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ormRepository.delete({
                                id: id,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error(error_6.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TeamsRepository;
}());
exports.default = TeamsRepository;
