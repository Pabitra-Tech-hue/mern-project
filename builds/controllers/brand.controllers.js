"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const sendresponse_utils_1 = require("../utils/sendresponse.utils");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utils_1 = require("../utils/cloudinary.utils");
// ================= GET ALL =================
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const brands = await brand_model_1.default.find({});
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "brands fetched",
        data: brands
    });
});
// ================= GET BY ID =================
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findById(id);
    if (!brand) {
        throw new appError_utils_1.default("brand not found", 404);
    }
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "brand fetched",
        data: brand
    });
});
// ================= CREATE =================
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { name, description } = req.body;
    const file = req.file;
    if (!name) {
        throw new appError_utils_1.default("name is required", 400);
    }
    if (!file) {
        throw new appError_utils_1.default("logo is required", 400);
    }
    const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/brands");
    const brand = await brand_model_1.default.create({
        name,
        description,
        logo: {
            path,
            public_id
        }
    });
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 201,
        message: "brand created",
        data: brand
    });
});
// ================= UPDATE =================
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;
    const brand = await brand_model_1.default.findById(id);
    if (!brand) {
        throw new appError_utils_1.default("brand not found", 404);
    }
    if (name) {
        brand.name = name;
    }
    if (description) {
        brand.description = description;
    }
    if (file) {
        if (brand.logo?.public_id) {
            await (0, cloudinary_utils_1.deleteFileFormCloudinary)(brand.logo.public_id);
        }
        const { path, public_id } = await (0, cloudinary_utils_1.uploadFileToCloudinary)(file, "/brands");
        brand.logo = {
            path,
            public_id
        };
    }
    await brand.save();
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "brand updated",
        data: brand
    });
});
// ================= DELETE =================
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findById(id);
    if (!brand) {
        throw new appError_utils_1.default("brand not found", 404);
    }
    if (brand.logo?.public_id) {
        await (0, cloudinary_utils_1.deleteFileFormCloudinary)(brand.logo.public_id);
    }
    await brand.deleteOne();
    (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "brand deleted",
        data: null
    });
});
