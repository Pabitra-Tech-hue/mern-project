import express from "express";

import{changePassword, getProfile, Login,Logout,register} from "../controllers/auth.controller";
import {validator} from "../middlewares/validators.middleware";
import {LoginUserSchema, logoutSchema,registerUserSchema} from "../validators/auth.validators";
import { multerUploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router=express.Router();
const upload=multerUploader();

// *register account
router.post(
  "/register",
  upload.single("profile_image"),//multer upload middleware
  validator(registerUserSchema),
  register,
)


// Login
router.post(
  "/login",
  validator(LoginUserSchema),
  Login
);

// logout
router.delete("/logout",validator(logoutSchema),
  Logout
);
router.get("/profile",authenticate(),getProfile);
router.put("/changePassword",authenticate(),changePassword)

export default router;




