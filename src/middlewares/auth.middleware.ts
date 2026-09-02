import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.types";
import AppError from "../utils/appError.utils";
import { verifyToken } from "../utils/Jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // 1. Get JWT token from cookies
      const access_token = req.cookies?.access_token;

      if (!access_token) {
        throw new AppError(
          "Unauthorized. Token required",
          401
        );
      }

      // 2. Verify JWT token
      const decoded_data = verifyToken(access_token);

      if (!decoded_data) {
        throw new AppError(
          "Unauthorized. Invalid token",
          401
        );
      }

      console.log("Decoded User:", decoded_data);


      // 3. Role authorization check
      if (
        roles &&
        roles.length > 0 &&
        !roles.includes(decoded_data.role as Role)
      ) {
        console.log("Required Roles:", roles);
        console.log("Current Role:", decoded_data.role);

        throw new AppError(
          "You cannot access this resource",
          403
        );
      }


      // 4. Attach user information to request
      req.user = {
        _id: decoded_data._id,
        email: decoded_data.email,
        role: decoded_data.role,
      };


      // 5. Continue request
      next();

    } catch (error) {
      next(error);
    }
  };
};
