"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const Jwt_utils_1 = require("../utils/Jwt.utils");
const authenticate = (roles) => {
    return (req, res, next) => {
        try {
            // 1. Get JWT token from cookies
            const access_token = req.cookies?.access_token;
            if (!access_token) {
                throw new appError_utils_1.default("Unauthorized. Token required", 401);
            }
            // 2. Verify JWT token
            const decoded_data = (0, Jwt_utils_1.verifyToken)(access_token);
            if (!decoded_data) {
                throw new appError_utils_1.default("Unauthorized. Invalid token", 401);
            }
            console.log("Decoded User:", decoded_data);
            // 3. Role authorization check
            if (roles &&
                roles.length > 0 &&
                !roles.includes(decoded_data.role)) {
                console.log("Required Roles:", roles);
                console.log("Current Role:", decoded_data.role);
                throw new appError_utils_1.default("You cannot access this resource", 403);
            }
            // 4. Attach user information to request
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                role: decoded_data.role,
            };
            // 5. Continue request
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
