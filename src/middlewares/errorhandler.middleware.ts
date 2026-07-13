
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  
  Error:any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
const statusCode =Error?.statusCode??500;
const message=Error?.message??"internala server error";
const status=Error?.status??"error";
const success=false;
res.status(statusCode).json({
    message,
    status,
    success,
    data:null,
    stack:Error?.stack??null,
});
};