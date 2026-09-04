"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const enum_types_1 = require("../types/enum.types");
const router = (0, express_1.Router)();
const upload = (0, multer_middleware_1.multerUploader)();
//* get all
router.get("/", product_controller_1.getAll);
//* get by id
router.get("/:id", product_controller_1.getById);
//* create
// {cover_image:[{}],images:[{},{},{}]}
router.post("/", upload.fields([
    {
        name: "cover_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    },
]), (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), product_controller_1.create);
//* update
router.put("/", upload.fields([
    {
        name: "cover_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    },
]), (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), product_controller_1.create);
router.delete("/:id", (0, auth_middleware_1.authenticate)([enum_types_1.Role.ADMIN, enum_types_1.Role.SUPER_ADMIN]), product_controller_1.remove);
exports.default = router;
