import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect("mongodb://localhost/trpcdb");
    console.log("Connected to database", db.connection.db.databaseName);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
