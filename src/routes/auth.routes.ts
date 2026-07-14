import express from "express";
import { Login,register } from "../controllers/auth.controller";

import { validator } from "../middlewares/validators.middleware";
import { loginUserSchema, registerUserSchema } from "../validators/auth.validators";

const router = express.Router();

// Register
router.post(
  "/register",
  validator(registerUserSchema),
  register
);

// Login
router.post(
  "/login",
  validator(loginUserSchema),
  Login
);

export default router;

