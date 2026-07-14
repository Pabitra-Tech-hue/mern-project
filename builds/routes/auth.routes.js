"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validators_middleware_1 = require("../middlewares/validators.middleware");
const auth_validators_1 = require("../validators/auth.validators");
const router = express_1.default.Router();
// Register account
router.post("/register", (0, validators_middleware_1.validator)(auth_validators_1.registerUserSchema), auth_controller_1.register);
exports.default = router;
