"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mini_1 = require("zod/mini");
const image_model_1 = __importDefault(require("./image.model"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: 3,
        maxLength: 200,
    },
    price: {
        type: Number,
        required: true,
        minLength: 0,
    },
    // brand:
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "brand",
        required: [true, "brand is required"],
    },
    description: {
        type: String,
        minLength: 50,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "category is required"],
    },
    cover_images: {
        type: mini_1.string,
        required: [true, "cover_images us required"],
    },
    images: [
        {
            type: image_model_1.default,
            default: null,
        },
    ],
    is_featured: {
        types: Boolean,
        default: false,
    },
    new_arrival: {
        types: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
