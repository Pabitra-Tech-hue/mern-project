import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Product from "../models/Product.model";
import AppError from "../utils/appError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendresponse.utils";

// Add product to wishlist
export const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    // Check product exists
    const product = await Product.findById(productId);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    // Check user exists
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check product already exists in wishlist
    if (user.wishlist.some((id) => id.toString() === productId)) {
      throw new AppError(
        "Product already exists in wishlist",
        400
      );
    }

    // Add product
    user.wishlist.push(product._id);
    await user.save();

    return sendResponse(res, {
      statusCode: 200,
      message: "Product added to wishlist",
      data: user.wishlist,
    });
  }
);

// Get wishlist
export const getWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await User.findById(userId).populate({
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
      throw new AppError("User not found", 404);
    }

    return sendResponse(res, {
      statusCode: 200,
      message: "Wishlist fetched successfully",
      data: user.wishlist,
    });
  }
);

// Remove product from wishlist
export const removeFromWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check product exists in wishlist
    const productExists = user.wishlist.some(
      (id) => id.toString() === productId
    );

    if (!productExists) {
      throw new AppError(
        "Product is not in wishlist",
        404
      );
    }

    // Remove product
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );

    await user.save();

    return sendResponse(res, {
      statusCode: 200,
      message: "Product removed from wishlist",
      data: user.wishlist,
    });
  }
);