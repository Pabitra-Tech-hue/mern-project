"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendresponse_utils_1 = require("../utils/sendresponse.utils");
// GET ALL PRODUCTS
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const products = await Product_model_1.default.find({});
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Products fetched successfully",
        data: products,
    });
});
// GET PRODUCT BY ID
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findById(id);
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product fetched successfully",
        data: product,
    });
});
// CREATE PRODUCT
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, price, description, category, } = req.body;
    if (!name) {
        throw new appError_utils_1.default("Product name is required", 400);
    }
    if (!price) {
        throw new appError_utils_1.default("Product price is required", 400);
    }
    const product = new Product_model_1.default({
        name,
        price,
        description,
        category,
    });
    await product.save();
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 201,
        message: "Product created successfully",
        data: product,
    });
});
// UPDATE PRODUCT
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, } = req.body;
    const product = await Product_model_1.default.findById(id);
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    if (description) {
        product.description = description;
    }
    if (category) {
        product.category = category;
    }
    await product.save();
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product updated successfully",
        data: product,
    });
});
// DELETE PRODUCT
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const product = await Product_model_1.default.findById(id);
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    await product.deleteOne();
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product deleted successfully",
        data: null,
    });
});
