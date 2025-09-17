import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log("Error connecting to the DB", err);
    process.exit(1);
  }
};
