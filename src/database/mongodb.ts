import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

async function connectToMongoDb() {
  const mongoDbUrl: string = MONGODB_URL || ""; // Provide a default empty string or replace it with an appropriate default value

  try {
    if (!mongoDbUrl) {
      throw new Error("MongoDB URL is not defined.");
    }

    await mongoose.connect(mongoDbUrl);
    console.log("mongodb is connected to host : " + mongoose.connection.host);
  } catch (error) {
    console.log(error);
    mongoose.disconnect(); // Disconnect from the database good because it will prevent the app from trying to use the database while it is in an invalid state
    process.exit(1); // Exit the app with a non-zero exit code, which indicates failure
  }
}

export default connectToMongoDb;
