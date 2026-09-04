import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorhandler.middleware";

//* importing routes
import authRoutes from "./routes/auth.routes";
import brandRoutes from "./routes/brand.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import wishlistRoutes from "./routes/wishlist.routes";

//* express app instance
const app = express();

//! CORS configuration (allowing requests from Next.js frontend)

app.use(
  cors({
    origin: ["http://localhost:3000",
    "https://mern-project-frontend-2vti.onrender.com",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

//! health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "server is up & running!!!!",
    success: true,
    status: "success",
    data: null,
  });
});

//! using routes (using /api/v1 prefix)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

//! using path not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method} on ${req.path}`;
  const error: any = new Error(message);
  error.status = "fail";
  error.statusCode = 404;
  next(error);
});

//! error handler middleware
app.use(errorHandler);

export default app;