"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error?.statusCode ?? 500;
    const message = error?.message ?? "Internal server error";
    const status = error?.status ?? "error";
    const success = false;
    res.status(statusCode).json({
        message,
        status,
        success,
        data: null,
        stack: error?.stack ?? null,
    });
};
exports.errorHandler = errorHandler;
