import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from "../controllers/category.controllers";
import { multerUploader } from "../middlewares/multer.middleware";

const router = express.Router();
const upload = multerUploader();

//* get all
router.get("/", getAll);

//* get by id
router.get("/:id", getById);

//* create
router.post("/", upload.single("image"), create);

//* update
router.put("/:id", upload.single("image"), update);

//* delete
router.delete("/:id", remove);

export default router;