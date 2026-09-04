"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorhandler_middleware_1 = require("./middlewares/errorhandler.middleware");
//* importing routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const brand_routes_1 = __importDefault(require("./routes/brand.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
//* express app instance
const app = (0, express_1.default)();
//! CORS configuration (allowing requests from Next.js frontend)
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000",
        "https://mern-project-frontend-2vti.onrender.com",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
//! health check route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up & running!!!!",
        success: true,
        status: "success",
        data: null,
    });
});
//! using routes (using /api/v1 prefix)
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/brands", brand_routes_1.default);
app.use("/api/v1/categories", category_routes_1.default);
app.use("/api/v1/products", product_routes_1.default);
app.use("/api/v1/wishlist", wishlist_routes_1.default);
//! using path not found route
app.use((req, res, next) => {
    const message = `Can not ${req.method} on ${req.path}`;
    const error = new Error(message);
    error.status = "fail";
    error.statusCode = 404;
    next(error);
});
//! error handler middleware
app.use(errorhandler_middleware_1.errorHandler);
exports.default = app;
