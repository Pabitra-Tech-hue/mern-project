import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";

const wishlistRouter = express.Router();

// Get wishlist
wishlistRouter.get(
  "/",
  authenticate([Role.USER]),
  getWishlist
);

// Add product to wishlist
wishlistRouter.post(
  "/:productId",
  authenticate([Role.USER]),
  addToWishlist
);

// Remove product from wishlist
wishlistRouter.delete(
  "/:productId",
  authenticate([Role.USER]),
  removeFromWishlist
);

export default wishlistRouter;