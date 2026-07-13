"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorhandler_middleware_js_1 = require("./middlewares/errorhandler.middleware.js");
// Express app instance
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Health check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up & running!",
        success: true,
        status: "success",
        data: null,
    });
});
// !using routes
// !using path not found route
app.use((req, res, next) => {
    const message = `con not ${req.method} on ${req.path}`;
    res.status(404).json({
        message,
        status: "fail",
        success: false,
        data: null,
    });
    next({
        message,
        status: "fail",
        success: false,
        statusCode: 404,
    });
});
// !errorhandler middleware
app.use(errorhandler_middleware_js_1.errorHandler);
exports.default = app;
