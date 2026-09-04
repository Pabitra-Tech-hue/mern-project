"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const wishlistRouter = express_1.default.Router();
// Get wishlist
wishlistRouter.get("/", (0, auth_middleware_1.authenticate)([enum_types_1.Role.USER]), wishlist_controller_1.getWishlist);
// Add product to wishlist
wishlistRouter.post("/:productId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.USER]), wishlist_controller_1.addToWishlist);
// Remove product from wishlist
wishlistRouter.delete("/:productId", (0, auth_middleware_1.authenticate)([enum_types_1.Role.USER]), wishlist_controller_1.removeFromWishlist);
exports.default = wishlistRouter;
