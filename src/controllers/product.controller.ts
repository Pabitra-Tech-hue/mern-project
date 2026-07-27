import { Request, Response } from "express";
import Product from "../models/Product.model";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendresponse.utils";


// GET ALL PRODUCTS

export const getAll = catchAsync(
  async (req: Request, res: Response) => {

    const products = await Product.find({});


    sendResponse(res, {
      statusCode: 200,
      message: "Products fetched successfully",
      data: products,
    });

  }
);



// GET PRODUCT BY ID

export const getById = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;


    const product = await Product.findById(id);


    if (!product) {
      throw new AppError(
        "Product not found",
        404
      );
    }


    sendResponse(res, {
      statusCode: 200,
      message: "Product fetched successfully",
      data: product,
    });

  }
);




// CREATE PRODUCT

export const create = catchAsync(
  async (req: Request, res: Response) => {

    const {
      name,
      price,
      description,
      category,
    } = req.body;



    if (!name) {
      throw new AppError(
        "Product name is required",
        400
      );
    }


    if (!price) {
      throw new AppError(
        "Product price is required",
        400
      );
    }



    const product = new Product({
      name,
      price,
      description,
      category,
    });



    await product.save();



    sendResponse(res, {
      statusCode: 201,
      message: "Product created successfully",
      data: product,
    });

  }
);




// UPDATE PRODUCT

export const update = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;


    const {
      name,
      price,
      description,
      category,
    } = req.body;



    const product = await Product.findById(id);



    if (!product) {
      throw new AppError(
        "Product not found",
        404
      );
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



    sendResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      data: product,
    });

  }
);




// DELETE PRODUCT

export const remove = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;



    const product = await Product.findById(id);



    if (!product) {
      throw new AppError(
        "Product not found",
        404
      );
    }



    await product.deleteOne();



    sendResponse(res, {
      statusCode: 200,
      message: "Product deleted successfully",
      data: null,
    });

  }
);