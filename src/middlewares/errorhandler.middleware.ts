import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error?.statusCode ?? 500;
  const message = error?.message ?? "Internal server error";
  const status = error?.status ?? "error";
  const success = false;

  res.status(statusCode).json({
    message,
    status,
    success,
    data: null,
    stack: error?.stack ?? null,
  });
};