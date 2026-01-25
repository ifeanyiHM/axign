import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

const connectToDatabase = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    return mongoose.connection.asPromise();
  }

  if (connectionState === 2) {
    return new Promise((resolve) => {
      mongoose.connection.once("connected", () => {
        resolve(mongoose.connection.asPromise());
      });
    });
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "axign",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
    return mongoose.connection.asPromise();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
