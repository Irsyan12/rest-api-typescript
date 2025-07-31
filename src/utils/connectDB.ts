import mongoose from "mongoose";
import config from "../config/environtment";
import { logger } from "./logger";

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info("Database connected successfully");
  })
  .catch((error) => {
    logger.error("Database connection failed", error);
    logger.error(error);
    process.exit(1);
  });
