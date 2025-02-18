/** @format */

import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    console.log("MongoDB Connected");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
