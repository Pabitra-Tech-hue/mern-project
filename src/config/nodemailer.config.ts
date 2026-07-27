import nodemailer from "nodemailer";
import { ENV_CONFIG } from "./env.config";

export const transporter = nodemailer.createTransport({
  host: ENV_CONFIG.SMTP_HOST,
  port: Number(ENV_CONFIG.SMTP_PORT),
  secure: false, // false for 587
  service: ENV_CONFIG.SMTP_SERVICE,

  auth: {
    user: ENV_CONFIG.SMTP_USER,
    pass: ENV_CONFIG.SMTP_PASS,
  },

  tls: {
    rejectUnauthorized: false, // only for local testing
  },
});

export const verifySmtp = async () => {
  try {
    await transporter.verify();
    console.log("SMTP server is ready to send email");
  } catch (error) {
    console.log(error);
  }
};
