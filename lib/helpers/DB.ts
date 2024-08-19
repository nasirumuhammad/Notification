import mongoose from "mongoose";

/**
 * creates a new data database connection
 */
async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_URL as string);
    console.log("database connected");
  } catch (error: any) {
    console.log(error.message);
  }
}
export default connectDB;
