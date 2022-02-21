"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
http_1.io.on('connection', function (socket) {
    if (socket.handshake.query.module && socket.handshake.query.contractId) {
        socket.join("".concat(socket.handshake.query.module, "_").concat(socket.handshake.query.contractId));
    }
    socket.on('disconnect', function () {
        console.log('desconectar');
    });
});
