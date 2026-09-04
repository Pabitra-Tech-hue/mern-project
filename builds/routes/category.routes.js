"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controllers_1 = require("../controllers/category.controllers");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploader)();
//* get all
router.get("/", category_controllers_1.getAll);
//* get by id
router.get("/:id", category_controllers_1.getById);
//* create
router.post("/", upload.single("image"), category_controllers_1.create);
//* update
router.put("/:id", upload.single("image"), category_controllers_1.update);
//* delete
router.delete("/:id", category_controllers_1.remove);
exports.default = router;
