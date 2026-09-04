"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.Logout = exports.getProfile = exports.Login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendresponse_utils_1 = require("../utils/sendresponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
const env_config_1 = require("../config/env.config");
const Jwt_utils_1 = require("../utils/Jwt.utils");
const sendEmail_utils_1 = require("../utils/sendEmail.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
//* register
exports.register = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    // Get signup data
    const { name, email, password, c_password } = req.body;
    // Check password
    if (password !== c_password) {
        throw new appError_utils_1.default("Passwords do not match", 400);
    }
    // Check existing email
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser) {
        throw new appError_utils_1.default("Email already exists", 400);
    }
    const file = req.file;
    // Create user
    const user = new user_model_1.default({
        full_name: name,
        email,
    });
    // Password hash
    const hash = await (0, bcrypt_utils_1.hashPassword)(password);
    user.password = hash;
    // Upload profile image
    if (file) {
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/profile_images");
        user.profile_image = {
            path,
            public_id,
        };
    }
    // Save user
    await user.save();
    // Send account created email
    (0, sendEmail_utils_1.sendEmail)({
        to: user.email,
        subject: "Account created",
        html: (0, emailTemplate_utils_1.generateAccountCreatedHtml)({
            full_name: user.full_name,
            email: user.email,
            createdAt: new Date(),
        }),
    });
    // Remove password from response
    const { password: _, ...rest } = user.toObject();
    // Send success response
    (0, sendresponse_utils_1.sendResponse)(res, {
        message: "Account created",
        data: rest,
        statusCode: 201,
    });
});
//* login
exports.Login = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { email, password } = req.body;
    //* Find user
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        throw new appError_utils_1.default("Invalid credentials", 400);
    }
    //* Compare password
    const isPassMatched = await (0, bcrypt_utils_1.comparePassword)(password, user.password);
    if (!isPassMatched) {
        throw new appError_utils_1.default("Invalid credentials", 400);
    }
    //* Generate JWT Token
    const access_token = (0, Jwt_utils_1.generateJwtToken)({
        _id: user._id,
        email: user.email,
        role: user.role,
    });
    //* Remove password from response
    const { password: _, ...rest } = user.toObject();
    //* Set Cookie
    res.cookie("access_token", access_token, {
        maxAge: Number(env_config_1.ENV_CONFIG.COOKIE_EXPIRY ?? "7") *
            24 *
            60 *
            60 *
            1000,
        httpOnly: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? false : true,
        secure: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? false : true,
        sameSite: env_config_1.ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
    });
    //* Send Login Success Email
    await (0, sendEmail_utils_1.sendEmail)({
        to: user.email,
        subject: "Login Successful",
        html: (0, emailTemplate_utils_1.generateLoginSuccessHtml)({
            full_name: user.full_name,
            email: user.email,
            loginAt: new Date(),
            userAgent: req.headers["user-agent"],
        }),
    });
    //* Success Response
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Login Success",
        data: {
            user: rest,
            access_token,
        },
    });
});
//* get profile
exports.getProfile = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const id = req.user._id;
    const user = await user_model_1.default.findById(id);
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    (0, sendresponse_utils_1.sendResponse)(res, {
        message: "Profile fetched",
        data: user,
        statusCode: 200,
    });
});
//* logout
exports.Logout = (0, catchAsync_utils_1.catchAsync)(async (_, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: env_config_1.ENV_CONFIG.NODE_ENV === "production",
        sameSite: "lax",
    });
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Logout successfully",
        data: null,
    });
});
//* change password
exports.changePassword = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { old_password, new_password } = req.body;
    if (!old_password) {
        throw new appError_utils_1.default("Old password is required", 400);
    }
    if (!new_password) {
        throw new appError_utils_1.default("New password is required", 400);
    }
    const user = await user_model_1.default.findById(req.user._id).select("+password");
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    const isPasswordMatched = await (0, bcrypt_utils_1.comparePassword)(old_password, user.password);
    if (!isPasswordMatched) {
        throw new appError_utils_1.default("Old password is incorrect", 400);
    }
    user.password = await (0, bcrypt_utils_1.hashPassword)(new_password);
    await user.save();
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Password changed successfully",
        data: null,
    });
});
