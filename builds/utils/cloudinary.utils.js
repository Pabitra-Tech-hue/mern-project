"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFormCloudinary = exports.uploadFileToCloudinary = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const appError_utils_1 = __importDefault(require("./appError.utils"));
const fs_1 = __importDefault(require("fs"));
// Upload file to Cloudinary
const uploadFileToCloudinary = async (file, dir = "/") => {
    try {
        const uploadFolder = "/team_16_1_30" + dir;
        const { secure_url: path, public_id } = await cloudinary_config_1.default.uploader.upload(file.path, {
            unique_filename: true,
            folder: uploadFolder,
        });
        // Delete file from local uploads folder
        if (fs_1.default.existsSync(file.path)) {
            fs_1.default.unlinkSync(file.path);
        }
        return {
            path,
            public_id
        };
    }
    catch (error) {
        console.log(error);
        throw new appError_utils_1.default("Something went wrong", 500);
    }
};
exports.uploadFileToCloudinary = uploadFileToCloudinary;
// Delete file from Cloudinary
const deleteFileFormCloudinary = async (public_id) => {
    try {
        const result = await cloudinary_config_1.default.uploader.destroy(public_id);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new appError_utils_1.default("Failed to delete file from Cloudinary", 500);
    }
};
exports.deleteFileFormCloudinary = deleteFileFormCloudinary;
