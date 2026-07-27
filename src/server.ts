import app from "./app";
import http from "http";
import connectDatabase from "./config/database.config";
import { verifySmtp } from "./config/nodemailer.config";
import { sendEmail } from "./utils/sendEmail.utils";


const PORT = 8080;

const DB_URI = "mongodb://localhost:27017/team_16_db";


// Connect database
connectDatabase(DB_URI);


// Create HTTP server
const server = http.createServer(app);


// Listen server
server.listen(PORT, async () => {

  await verifySmtp();

  await sendEmail({
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