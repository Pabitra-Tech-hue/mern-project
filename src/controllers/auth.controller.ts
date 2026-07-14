import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import AppError from  "../utils/appError.utils";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";




//* register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password } = req.body;

    const user = new User({ full_name, email });

    //* password hash
    const hash = await hashPassword(password);
    user.password = hash;

    //* upload profile image

    // * save user
    await user.save();

    //* converting mongodb doc to js object
    const { password: user_pass, ...rest } = user.toObject();

    //* send success response
    res.status(201).json({
      message: "Account created",
      status: "success",
      success: true,
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

// *login

export const Login=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password}=req.body;
        const user =await User.findOne({email}).select("+password");
        if(!user){
            throw new AppError("Invalid email or password",400);

        }
        const isPasswordMatch=await comparePassword(password,user.password);
        if(!isPasswordMatch){
            throw new AppError("Invalid email or password",400);
        }
        const {password:user_password,...rest}=user.toObject();
        res.status(200).json({
            message:"Login SUccessfull",
            status:"success",
            success:true,
            data:rest,
        });
    }catch(error){
        next(error);
    }
};
