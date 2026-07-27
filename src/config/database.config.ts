import mongoose from "mongoose";

const connectDatabase = async (DB_URI: string) => {
  try {
    await mongoose.connect(DB_URI);

    console.log("Database connected successfully");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

  } catch (error) {
    console.log("Database connection error");
    console.log(error);
  }
}


export default connectDatabase;

