import mongoose from "mongoose";

async function connectToMongoDb() {
  const mongoDbUrl: string = process.env.MONGODB_URL || ""; // Provide a default empty string or replace it with an appropriate default value

  try {
    if (!mongoDbUrl) {
      throw new Error("MongoDB URL is not defined.");
    }

    await mongoose.connect(mongoDbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export default connectToMongoDb;
