"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_model_1 = __importDefault(require("./image.model"));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (Role = {}));
// Schema
const userSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    profile_image: {
        type: image_model_1.default,
        default: null,
    },
}, {
    timestamps: true,
});
// Model
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
