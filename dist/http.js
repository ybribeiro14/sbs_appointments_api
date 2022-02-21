"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.serverHttp = void 0;
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var AppError_1 = __importDefault(require("./errors/AppError"));
var routes_1 = __importDefault(require("./routes"));
require("./database/index");
require("./container");
// import uploadConfig from '@config/upload';
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use('/files', express.static(uploadConfig.directory));
app.use(routes_1.default);
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(200).json(err);
    }
    console.error(err);
    return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' });
});
var serverHttp = http_1.default.createServer(app);
exports.serverHttp = serverHttp;
var io = new socket_io_1.Server(serverHttp, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
