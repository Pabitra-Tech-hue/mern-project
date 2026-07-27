import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendresponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { uploadFileToCloudinary } from "../utils/cloudinary.utils";

import { ENV_CONFIG } from "../config/env.config";
import { generateJwtToken } from "../utils/Jwt.utils";
import { sendEmail } from "../utils/sendEmail.utils";
import { generateAccountCreatedHtml, generateLoginSuccessHtml } from "../utils/emailTemplate.utils";

//* register
export const register = catchAsync(async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;
  const file = req.file;
  const user = new User({ full_name, email });

  //* password hash
  const hash = await hashPassword(password);
  user.password = hash;

  //* upload profile image
  if (file) {
    const { path, public_id } = await uploadFileToCloudinary(
      file,
      "/profile_images",
    );

    user.profile_image = {
      path,
      public_id,
    };
  }

  // * save user
  await user.save();
  // *send account created email
    //*send account created email
  sendEmail({
    to: user.email,
    subject: "Account created",
    html: generateAccountCreatedHtml({
      full_name: user.full_name,
      email: user.email,
      createdAt: new Date(Date.now()),
    }),
  });

  //* converting mongodb doc to js object
  const { password: _, ...rest } = user.toObject();

  //* send success response
  sendResponse(res, {
    message: "Account created",
    data: rest,
    statusCode: 201,
  });
});
//* login
export const Login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //* Find user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError("Invalid credentials", 400);
    }

    //* Compare password
    const isPassMatched = await comparePassword(password, user.password);

    if (!isPassMatched) {
      throw new AppError("Invalid credentials", 400);
    }

    //* Generate JWT Token
    const access_token = generateJwtToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    //* Remove password from response
    const { password: _, ...rest } = user.toObject();

    //* Set Cookie
    res.cookie("access_token", access_token, {
      maxAge: Number(ENV_CONFIG.COOKIE_EXPIRY ?? "7") * 24 * 60 * 60 * 1000,
      httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
    });

    //* Send Login Success Email
    await sendEmail({
      to: user.email,
      subject: "Login Successful",
      html: generateLoginSuccessHtml({
        full_name: user.full_name,
        email: user.email,
        loginAt: new Date(),
        userAgent: req.headers["user-agent"] as string,
      }),
    });

    //* Success Response
    sendResponse(res, {
      statusCode: 200,
      message: "Login Success",
      data: {
        user: rest,
        access_token,
      },
    });
  }
);




// *get profile
export const getProfile=catchAsync(async(req, res)=>{
  const id=req.user._id;
  const user=await User.findById(id);
  if (!user ) throw new AppError ("user not found",404);
  sendResponse(res,{
    message:"profile fetched",
    data:user,
    statusCode:200,
  
  })

})






// *logout

export const Logout = catchAsync(
  async (_, res: Response) => {

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: ENV_CONFIG.NODE_ENV === "production",
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: 200,
      message: "Logout successfully",
      data: null,
    });

  }
);

// *change password
export const changePassword = catchAsync(
  async (req: Request, res: Response) => {

    const { old_password, new_password } = req.body;

    if (!old_password) {
      throw new AppError("Old password is required", 400);
    }

    if (!new_password) {
      throw new AppError("New password is required", 400);
    }

    const user = await User.findById((req as any).user._id).select("+password");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isPasswordMatched = await comparePassword(
      old_password,
      user.password as string
    );

    if (!isPasswordMatched) {
      throw new AppError("Old password is incorrect", 400);
    }

    user.password = await hashPassword(new_password);

    await user.save();

    sendResponse(res, {
      statusCode: 200,
      
     
      message: "Password changed successfully",
      data: null,
      
    });
  }
);