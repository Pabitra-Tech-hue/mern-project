import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorhandler.middleware";
// npm i -D  @types/express //  npm i --save-dev  @types/express
import cookieParser from "cookie-parser";


//* importing routes
import authRoutes from "./routes/auth.routes";
import brandRoutes from "./routes/brand.routes";

//* express app instance
const app = express();

//! using middlewares
app.use(express.json());
app.use(cookieParser());




//! health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is up & running!!!!",
    success: true,
    status: "success",
    data: null,
  });
});

//! using routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v2/auth", authRoutes);

app.use("/api/v1/brands", brandRoutes);

//! using path not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `can not ${req.method} on ${req.path}`;
  const error: any = new Error(message);
  error.status = "fail";
  error.statusCode = 404;
  next(error);
});

//! error handler middleware
app.use(errorHandler);

export default app;

