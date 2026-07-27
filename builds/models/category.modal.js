"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "name must be at least 3 characters long"],
        trim: true,
    },
    description: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
// model
const Category = mongoose_1.default.model("category", categorySchema);
exports.default = Category;
