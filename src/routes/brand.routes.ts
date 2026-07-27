import express from "express";
 import {getAll,getById, create,update,remove} from "../controllers/brand.controllers"
 import {authenticate} from "../middlewares/auth.middleware";
import { Role } from "../types/enum.types";
import { multerUploader } from "../middlewares/multer.middleware";



const router = express.Router();
const upload=multerUploader();

// *get all
router.get("/" ,authenticate([Role.ADMIN,Role.SUPER_ADMIN]),
upload.single("logo"),getAll);

// *getById
router.get("/:id",authenticate([Role.ADMIN,Role.SUPER_ADMIN]),
upload.single("logo") ,getById);

// *POST
router.post("/",authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    upload.single("logo"),create);

// *put
router.put("/:id",authenticate([Role.ADMIN, Role.SUPER_ADMIN]),
    upload.single("logo"), update);

    // *delete
router.delete("/:id", authenticate([Role.ADMIN,Role.SUPER_ADMIN]),
    upload.single("logo"),remove);

export default router;