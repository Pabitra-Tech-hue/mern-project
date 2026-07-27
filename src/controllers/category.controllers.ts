import {Request,Response} from "express";
import Category from "../models/category.modal";
import { sendResponse } from "../utils/sendresponse.utils";
import AppError from "../utils/appError.utils";




export const createCategory = async (
  req: Request,
  res: Response
) => {
  const { name, description } = req.body;

  const createCategory = await Category.create({
    name,
    description,
  });

  sendResponse(res, {
    statusCode: 201,
    message: "Category created successfully",
    data: createCategory,
  });
};




// getbyid
export const getById=async(req:Request,res:Response)=>{
    const {id}=req.params;
    const category=await Category.findById(id);

       if (!category) {
      throw new AppError("Category not found", 404);
    }
    sendResponse(res,{
        statusCode:201,
        message:"Brand createdd successfully",
        data:category,

    });
    };



    // *update
    export const update=async(req:Request,res:Response)=>{
        
           const { id } = req.params;

   
           const category=await Category.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

          sendResponse(res,{

            statusCode:201,
            message:"category updated successfully",
            data:category,
          })  
        }
    

        // *delete
        export const remove=async(req:Request,res:Response)=>{
            const {id}=req.params;
            const category=await Category.findById(id);
            if (!category){
                throw new AppError("category not found",400);
            
        }
        sendResponse(res,{
            statusCode:200,
            message:"brand deleted successfully",
            data:null,
        });
    };
