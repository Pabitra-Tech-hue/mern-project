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
            // 1. Get JWT Token
            const access_token = req.cookies?.access_token;
            if (!access_token) {
                throw new appError_utils_1.default("Unauthorized. Token required", 401);
            }
            // 2. Verify Token
            const decoded_data = (0, Jwt_utils_1.verifyToken)(access_token);
            console.log("Decoded User:", decoded_data);
            if (!decoded_data) {
                throw new appError_utils_1.default("Unauthorized. Invalid token", 401);
            }
            // 3. Check User Role
            if (roles &&
                roles.length > 0 &&
                !roles.includes(decoded_data.role)) {
                console.log("Required Roles:", roles);
                console.log("Current User Role:", decoded_data.role);
                throw new appError_utils_1.default("You cannot access this resource", 403);
            }
            // 4. Add user data to request
            req.user = {
                _id: decoded_data._id,
                email: decoded_data.email,
                role: decoded_data.role,
            };
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authenticate = authenticate;
