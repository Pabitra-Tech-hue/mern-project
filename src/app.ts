import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/errorhandler.middleware.js";

// Express app instance
const app = express();

// Middleware
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up & running!",
    success: true,
    status: "success",
    data: null,
  });
});


// !using routes

// !using path not found route
app.use((req:Request, res:Response, next:NextFunction)=>{
    const message=`con not ${req.method} on ${req.path}`;
 
    next({
           message,
        status:"fail",
        success:false,
        statusCode:404,
    })

});
// !errorhandler middleware
app.use(errorHandler);
export default app;

