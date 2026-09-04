"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controllers_1 = require("../controllers/brand.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploader)();
// GET ALL BRANDS
router.get("/", brand_controllers_1.getAll);
// GET ONE BRAND
router.get("/:id", brand_controllers_1.getById);
// CREATE BRAND
router.post("/", (0, auth_middleware_1.authenticate)([enum_types_1.Role.USER, enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), upload.single("logo"), brand_controllers_1.create);
// UPDATE BRAND
router.put("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), upload.single("logo"), brand_controllers_1.update);
// DELETE BRAND
router.delete("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), brand_controllers_1.remove);
exports.default = router;
