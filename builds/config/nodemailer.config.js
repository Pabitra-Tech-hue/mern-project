"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySmtp = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_config_1 = require("./env.config");
exports.transporter = nodemailer_1.default.createTransport({
    host: env_config_1.ENV_CONFIG.SMTP_HOST,
    port: Number(env_config_1.ENV_CONFIG.SMTP_PORT),
    secure: false, // false for 587
    service: env_config_1.ENV_CONFIG.SMTP_SERVICE,
    auth: {
        user: env_config_1.ENV_CONFIG.SMTP_USER,
        pass: env_config_1.ENV_CONFIG.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // only for local testing
    },
});
const verifySmtp = async () => {
    try {
        await exports.transporter.verify();
        console.log("SMTP server is ready to send email");
    }
    catch (error) {
        console.log(error);
    }
};
exports.verifySmtp = verifySmtp;
