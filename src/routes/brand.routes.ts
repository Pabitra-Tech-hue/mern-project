import express from "express";

import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/brand.controllers";

import { authenticate } from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";
import { multerUploader } from "../middlewares/multer.middleware";

const router = express.Router();

const upload = multerUploader();

// GET ALL BRANDS
router.get(
  "/",

  getAll,
);

// GET ONE BRAND
router.get(
  "/:id",

  getById,
);

// CREATE BRAND
router.post(
  "/",
  authenticate([Role.USER, Role.ADMIN, Role.SUPER_ADMIN]),
  upload.single("logo"),
  create,
);

// UPDATE BRAND
router.put(
  "/:id",
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  upload.single("logo"),
  update,
);

// DELETE BRAND
router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), remove);

export default router;
