"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(message, reason, statusCode) {
        if (statusCode === void 0) { statusCode = 400; }
        this.message = message;
        this.statusCode = statusCode;
        this.reason = reason;
        this.status = false;
        this.timestamp = Date.now();
    }
    return AppError;
}());
exports.default = AppError;
