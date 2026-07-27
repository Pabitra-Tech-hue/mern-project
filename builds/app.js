"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorhandler_middleware_1 = require("./middlewares/errorhandler.middleware");
// npm i -D  @types/express //  npm i --save-dev  @types/express
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//* importing routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
//* express app instance
const app = (0, express_1.default)();
//! using middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//! health check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up & running!!!!",
        success: true,
        status: "success",
        data: null,
    });
});
//! using routes
app.use("/api/v1/auth", auth_routes_1.default);
// app.use("/api/v2/auth", authRoutes);
app.use("/api/v1/brands", brand_routes_1.default);
//! using path not found route
app.use((req, res, next) => {
    const message = `can not ${req.method} on ${req.path}`;
    const error = new Error(message);
    error.status = "fail";
    error.statusCode = 404;
    next(error);
});
//! error handler middleware
app.use(errorhandler_middleware_1.errorHandler);
exports.default = app;
