"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (Error, req, res, next) => {
    const statusCode = Error?.statusCode ?? 500;
    const message = Error?.message ?? "internala server error";
    const status = Error?.status ?? "error";
    const success = false;
    res.status(statusCode).json({
        message,
        status,
        success,
        data: null,
        stack: Error?.stack ?? null,
    });
};
exports.errorHandler = errorHandler;
