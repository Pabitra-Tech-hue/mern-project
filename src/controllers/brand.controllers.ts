import { Request, Response} from "express";
import Brand from "../models/brand.model";
import { sendResponse } from "../utils/sendresponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";

import {
  deleteFileFormCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";



// ================= GET ALL =================

export const getAll = catchAsync(
async (
  req: Request,
  res: Response
) => {

  const brands = await Brand.find({});


  sendResponse(res,{
    statusCode:200,
    message:"brands fetched",
    data:brands
  });

});




// ================= GET BY ID =================

export const getById = catchAsync(
async(
  req:Request,
  res:Response
)=>{

  const {id}=req.params;


  const brand = await Brand.findById(id);


  if(!brand){
    throw new AppError(
      "brand not found",
      404
    );
  }


  sendResponse(res,{
    statusCode:200,
    message:"brand fetched",
    data:brand
  });

});




// ================= CREATE =================

export const create = catchAsync(
async(
 req:Request,
 res:Response
)=>{


 const {
  name,
  description
 } = req.body;


 const file=req.file;


 if(!name){
  throw new AppError(
    "name is required",
    400
  );
 }


 if(!file){
  throw new AppError(
    "logo is required",
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



 const brand = await Brand.create({

  name,

  description,

  logo:{
    path,
    public_id
  }

 });



 sendResponse(res,{
  statusCode:201,
  message:"brand created",
  data:brand
 });


});




// ================= UPDATE =================

export const update = catchAsync(
async(
 req:Request,
 res:Response
)=>{


 const {id}=req.params;


 const {
  name,
  description
 }=req.body;


 const file=req.file;



 const brand = await Brand.findById(id);



 if(!brand){
  throw new AppError(
    "brand not found",
    404
  );
 }



 if(name){
  brand.name=name;
 }



 if(description){
  brand.description=description;
 }




 if(file){


  if(brand.logo?.public_id){

    await deleteFileFormCloudinary(
      brand.logo.public_id
    );

  }



  const {
    path,
    public_id
  } =
  await uploadFileToCloudinary(
    file,
    "/brands"
  );



  brand.logo={
    path,
    public_id
  };


 }



 await brand.save();



 sendResponse(res,{
  statusCode:200,
  message:"brand updated",
  data:brand
 });


});




// ================= DELETE =================

export const remove = catchAsync(
async(
 req:Request,
 res:Response
)=>{


 const {id}=req.params;


 const brand =
 await Brand.findById(id);



 if(!brand){

  throw new AppError(
    "brand not found",
    404
  );

 }



 if(brand.logo?.public_id){

  await deleteFileFormCloudinary(
    brand.logo.public_id
  );

 }



 await brand.deleteOne();



 sendResponse(res,{
  statusCode:200,
  message:"brand deleted",
  data:null
 });


});