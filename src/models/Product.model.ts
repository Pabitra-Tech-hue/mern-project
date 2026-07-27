import mongoose from "mongoose";

import { string } from "zod/mini";
import ImageSchema from "./image.model";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[true,"name is required"],
      minLength:3,
      maxLength:200,
     
    },
    price: {
      type: Number,
      required: true,
      minLength:0,
    },
    // brand:
    brand:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"brand",
      required:[true,"brand is required"],
    },
    description: {
      type: String,
     minLength:50,
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"category",
      required:[true, "category is required"],
    },
    cover_images:{
      type:string,
      required:[true,"cover_images us required"],
    },
    images:[
    {
      type:ImageSchema,
      default:null,
    },
    ],
    is_featured:{
      types:Boolean,
      default:false,
    },
    new_arrival:{
      types:Boolean,
      default:true,
    }
   
    },
  
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;