"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.getWishlist = exports.addToWishlist = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendresponse_utils_1 = require("../utils/sendresponse.utils");
// Add product to wishlist
exports.addToWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
        throw new appError_utils_1.default("Unauthorized", 401);
    }
    // Check product exists
    const product = await Product_model_1.default.findById(productId);
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    // Check user exists
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    // Check product already exists in wishlist
    if (user.wishlist.some((id) => id.toString() === productId)) {
        throw new appError_utils_1.default("Product already exists in wishlist", 400);
    }
    // Add product
    user.wishlist.push(product._id);
    await user.save();
    return (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product added to wishlist",
        data: user.wishlist,
    });
});
// Get wishlist
exports.getWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new appError_utils_1.default("Unauthorized", 401);
    }
    const user = await user_model_1.default.findById(userId).populate({
        path: "wishlist",
        populate: [
            {
                path: "brand",
            },
            {
                path: "category",
            },
        ],
    });
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    return (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Wishlist fetched successfully",
        data: user.wishlist,
    });
});
// Remove product from wishlist
exports.removeFromWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user?._id;
    if (!userId) {
        throw new appError_utils_1.default("Unauthorized", 401);
    }
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new appError_utils_1.default("User not found", 404);
    }
    // Check product exists in wishlist
    const productExists = user.wishlist.some((id) => id.toString() === productId);
    if (!productExists) {
        throw new appError_utils_1.default("Product is not in wishlist", 404);
    }
    // Remove product
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();
    return (0, sendresponse_utils_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product removed from wishlist",
        data: user.wishlist,
    });
});
