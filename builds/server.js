"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const database_config_1 = __importDefault(require("./config/database.config"));
const nodemailer_config_1 = require("./config/nodemailer.config");
const sendEmail_utils_1 = require("./utils/sendEmail.utils");
const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/team_16_db";
// Connect database
(0, database_config_1.default)(DB_URI);
// Create HTTP server
const server = http_1.default.createServer(app_1.default);
// Listen server
server.listen(PORT, async () => {
    await (0, nodemailer_config_1.verifySmtp)();
    await (0, sendEmail_utils_1.sendEmail)({
        to: "dangipabitra64@gmail.com",
        subject: "Account created",
        html: `
      <div>
        <h1>Hello Pabitra</h1>
        <p>Your email service is working successfully.</p>
      </div>
    `,
    });
    console.log(`server is running at http://localhost:${PORT}`);
});
