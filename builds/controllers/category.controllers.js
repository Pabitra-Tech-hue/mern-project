"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.createCategory = void 0;
const category_modal_1 = __importDefault(require("../models/category.modal"));
const sendresponse_utils_1 = require("../utils/sendresponse.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    const createCategory = await category_modal_1.default.create({
        name,
        description,
    });
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 201,
        message: "Category created successfully",
        data: createCategory,
    });
};
exports.createCategory = createCategory;
// getbyid
const getById = async (req, res) => {
    const { id } = req.params;
    const category = await category_modal_1.default.findById(id);
    if (!category) {
        throw new appError_utils_1.default("Category not found", 404);
    }
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 201,
        message: "Brand createdd successfully",
        data: category,
    });
};
exports.getById = getById;
// *update
const update = async (req, res) => {
    const { id } = req.params;
    const category = await category_modal_1.default.findById(id);
    if (!category) {
        throw new appError_utils_1.default("Category not found", 404);
    }
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 201,
        message: "category updated successfully",
        data: category,
    });
};
exports.update = update;
// *delete
const remove = async (req, res) => {
    const { id } = req.params;
    const category = await category_modal_1.default.findById(id);
    if (!category) {
        throw new appError_utils_1.default("category not found", 400);
    }
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "brand deleted successfully",
        data: null,
    });
};
exports.remove = remove;
