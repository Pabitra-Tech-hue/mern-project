import mongoose from "mongoose";

// imterface
export interface ICategory extends Document{
    name:String,
    description:String,
}


const categorySchema=new mongoose.Schema<ICategory>(
    {
        name:{
            type:String,
            required:[true,"name is required"],
            minLength:[3, "name must be at least 3 characters long"],
            trim:true,

        },
        description:{
            type:String,
            default:null,
        },
    },
    {
        timestamps:true,
    }

);


// model
const Category=mongoose.model<ICategory>("category",categorySchema);
export default Category;
