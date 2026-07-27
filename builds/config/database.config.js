"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async (DB_URI) => {
    try {
        await mongoose_1.default.connect(DB_URI);
        console.log("Database connected successfully");
        console.log("Database:", mongoose_1.default.connection.name);
        console.log("Host:", mongoose_1.default.connection.host);
    }
    catch (error) {
        console.log("Database connection error");
        console.log(error);
    }
};
exports.default = connectDatabase;
