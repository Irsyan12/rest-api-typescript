import mongoose from "mongoose";
import config from "../config/environtment";
import { logger } from "./logger";

// Global variable to cache the database connection
declare global {
  var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(`${config.db}`, opts)
      .then((mongoose) => {
        logger.info("Database connected successfully");
        return mongoose;
      })
      .catch((error) => {
        logger.error("Database connection failed", error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
