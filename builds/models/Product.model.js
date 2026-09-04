"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_model_1 = __importDefault(require("./image.model"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [200, "Name cannot exceed 200 characters"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [
            50,
            "Description must be at least 50 characters long",
        ],
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "brand",
        required: [true, "Brand is required"],
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Category is required"],
    },
    cover_image: {
        type: image_model_1.default,
        required: [true, "Cover image is required"],
    },
    images: [
        {
            type: image_model_1.default,
        },
    ],
    is_featured: {
        type: Boolean,
        default: false,
    },
    new_arrival: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
