import mongoose from "mongoose";
import { env } from "../env/variables.js";

const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB...`);
    await mongoose.connect(env.DB_URL);
    console.log(`Server connected to MongoDB!`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
