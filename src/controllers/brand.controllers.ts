import { Request, Response } from "express";
import Brand from "../models/brand.model";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendresponse.utils";

import {
  uploadFileToCloudinary,
  deleteFileFormCloudinary,
} from "../utils/cloudinary.utils";



// GET ALL

export const getAll = catchAsync(
async(req:Request,res:Response)=>{

 const brands = await Brand.find({});


 sendResponse(res,{
  statusCode:200,
  message:"Brands fetched successfully",
  data:brands
 });

});




// GET BY ID

export const getById = catchAsync(
async(req:Request,res:Response)=>{

 const {id}=req.params;


 const brand = await Brand.findById(id);


 if(!brand)
 {
  throw new AppError(
   "Brand not found",
   404
  );
 }


 sendResponse(res,{
  statusCode:200,
  message:"Brand fetched successfully",
  data:brand
 });


});




// CREATE
export const create = catchAsync(
  async (req: Request, res: Response) => {

    const {
      name,
      description
    } = req.body;

    const file = req.file;

    if (!name) {
      throw new AppError(
        "Name is required",
        400
      );
    }

    if (!file) {
      throw new AppError(
        "Logo is required",
        400
      );
    }

    const {
      path,
      public_id
    } = await uploadFileToCloudinary(
      file,
      "/brands"
    );

    const brand = new Brand({
      name,
      description,

      logo: {
        path,
        public_id
      }
    });

    await brand.save();

    sendResponse(res, {
      statusCode: 201,
      message: "Brand created successfully",
      data: brand
    });
  }
);




// UPDATE
export const update = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;

    const { name, description } = req.body;

    const file = req.file;


    const brand = await Brand.findById(id);


    if (!brand) {
      throw new AppError(
        "Brand not found",
        404
      );
    }


    if (name) {
      brand.name = name;
    }


    if (description) {
      brand.description = description;
    }


    if (file) {

      // delete old image
      if (brand.logo?.public_id) {
        await deleteFileFormCloudinary(
          brand.logo.public_id
        );
      }


      // upload new image
      const { path, public_id } =
        await uploadFileToCloudinary(
          file,
          "/brands"
        );


      // update logo
      brand.set("logo", {
        path,
        public_id,
      });
    }


    await brand.save();


    sendResponse(res, {
      statusCode: 200,
      message: "Brand updated successfully",
      data: brand,
    });
  }
);




// DELETE

export const remove = catchAsync(
async(req:Request,res:Response)=>{


 const {id}=req.params;



 const brand =
 await Brand.findById(id);



 if(!brand)
 {
  throw new AppError(
   "Brand not found",
   404
  );
 }



 if(brand.logo?.public_id)
 {
  await deleteFileFormCloudinary(
   brand.logo.public_id
  );
 }



 await brand.deleteOne();



 sendResponse(res,{
  statusCode:200,
  message:"Brand deleted successfully",
  data:null
 });


});