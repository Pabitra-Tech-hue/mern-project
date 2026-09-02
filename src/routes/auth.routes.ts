import express from "express";

import {
  changePassword,
  getProfile,
  Login,
  Logout,
  register,
} from "../controllers/auth.controller";

import { validator } from "../middlewares/validators.middleware";

import {
  LoginUserSchema,
  logoutSchema,
  registerUserSchema,
} from "../validators/auth.validators";

import { multerUploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const upload = multerUploader();

// * Signup
router.post(
  "/signup",
  upload.single("profile_image"),
  validator(registerUserSchema),
  register
);

// * Login
router.post(
  "/login",
  validator(LoginUserSchema),
  Login
);

// * Logout
router.delete(
  "/logout",
  authenticate(),
  validator(logoutSchema),
  Logout
);

// * Get profile
router.get(
  "/profile",
  authenticate(),
  getProfile
);

// * Change password
router.put(
  "/changePassword",
  authenticate(),
  changePassword
);

export default router;




