"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validators_middleware_1 = require("../middlewares/validators.middleware");
const auth_validators_1 = require("../validators/auth.validators");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.multerUploader)();
// * Signup
router.post("/signup", upload.single("profile_image"), (0, validators_middleware_1.validator)(auth_validators_1.registerUserSchema), auth_controller_1.register);
// * Login
router.post("/login", (0, validators_middleware_1.validator)(auth_validators_1.LoginUserSchema), auth_controller_1.Login);
// * Logout
router.delete("/logout", (0, auth_middleware_1.authenticate)(), (0, validators_middleware_1.validator)(auth_validators_1.logoutSchema), auth_controller_1.Logout);
// * Get profile
router.get("/profile", (0, auth_middleware_1.authenticate)(), auth_controller_1.getProfile);
// * Change password
router.put("/changePassword", (0, auth_middleware_1.authenticate)(), auth_controller_1.changePassword);
exports.default = router;
