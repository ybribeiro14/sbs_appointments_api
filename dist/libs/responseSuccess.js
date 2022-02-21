"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseSuccess = /** @class */ (function () {
    function ResponseSuccess(data) {
        this.data = data;
        this.statusCode = 200;
        this.status = true;
        this.timestamp = Date.now();
    }
    return ResponseSuccess;
}());
exports.default = ResponseSuccess;
