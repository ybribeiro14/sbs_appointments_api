"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var src = path_1.default.resolve(__dirname, '../');
dotenv_1.default.config({ path: "".concat(src, "/.env.").concat(process.env.NODE_ENV) });
var http_1 = require("./http");
require("./websocket");
http_1.serverHttp.listen(3333, function () {
    console.log('🚀 Server started on port 3333');
});
