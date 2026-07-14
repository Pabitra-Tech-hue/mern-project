"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
//* register
const register = async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;
        if (!full_name) {
            const error = new Error("full_name is required");
            error.status = "fail";
            error.statusCode = 400;
            throw error;
        }
        if (!email) {
            const error = new Error("email is required");
            error.status = "fail";
            error.statusCode = 400;
            throw error;
        }
        if (!password) {
            const error = new Error("password is required");
            error.status = "fail";
            error.statusCode = 400;
            throw error;
        }
        const user = new user_model_1.default({ full_name, email });
        //* password hash
        const hash = await (0, bcrypt_utils_1.hashPassword)(password);
        user.password = hash;
        //* upload profile image
        // * save user
        await user.save();
        //* converting mongodb doc to js object
        const { password: user_pass, ...rest } = user.toObject();
        //* send success response
        res.status(201).json({
            message: "Account created",
            status: "success",
            success: true,
            data: rest,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
