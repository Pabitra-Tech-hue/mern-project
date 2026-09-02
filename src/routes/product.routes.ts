import { Router } from "express";
import {
  create,
  getAll,
  getById,
  remove,
} from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { multerUploader } from "../middlewares/multer.middleware";
import { Role } from "../types/enum.types";

const router = Router();
const upload = multerUploader();

//* get all
router.get("/", getAll);

//* get by id
router.get("/:id", getById);

//* create

// {cover_image:[{}],images:[{},{},{}]}
router.post(
  "/",
  upload.fields([
    {
      name: "cover_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  create,
);

//* update
router.put(
  "/",
  upload.fields([
    {
      name: "cover_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
  create,
);

router.delete("/:id", authenticate([Role.ADMIN, Role.SUPER_ADMIN]), remove);
export default router;