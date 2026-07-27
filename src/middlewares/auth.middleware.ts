import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.types";
import AppError from "../utils/appError.utils";
import { verifyToken } from "../utils/Jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {

      // 1. Get JWT Token
      const access_token = req.cookies?.access_token;

      if (!access_token) {
        throw new AppError("Unauthorized. Token required", 401);
      }


      // 2. Verify Token
      const decoded_data = verifyToken(access_token);

      console.log("Decoded User:", decoded_data);


      if (!decoded_data) {
        throw new AppError("Unauthorized. Invalid token", 401);
      }


      // 3. Check User Role
      if (
        roles &&
        roles.length > 0 &&
        !roles.includes(decoded_data.role as Role)
      ) {

        console.log("Required Roles:", roles);
        console.log("Current User Role:", decoded_data.role);

        throw new AppError(
          "You cannot access this resource",
          403
        );
      }


      // 4. Add user data to request
      req.user = {
        _id: decoded_data._id,
        email: decoded_data.email,
        role: decoded_data.role,
      };


      next();

    } catch (error) {
      next(error);
    }
  };
};
