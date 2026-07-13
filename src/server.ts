import app from "./app";
import http from "http";
import {connectDatabase} from "./config/database.config"; 
const PORT=8080;
const DB_URI="mongodb://localhost:27017/team_16_db";


// *connect database"

// *http server 
const server = http.createServer(app);

// *listen
server.listen (PORT,()=>{
    console.log(`server is running at http://localhost: ${PORT}`)
});