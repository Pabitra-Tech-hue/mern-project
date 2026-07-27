"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
router.post("/", product_controller_1.create);
router.get("/", product_controller_1.getAll);
router.get("/:id", product_controller_1.getById);
router.put("/:id", product_controller_1.update);
router.delete("/:id", product_controller_1.remove);
exports.default = router;
