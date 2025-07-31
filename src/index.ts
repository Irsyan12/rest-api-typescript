import express, { Application, Request, Response } from "express";
import { routes } from "./routes";
import { logger } from "./utils/logger";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./utils/connectDB";
import deserializedToken from "./middleware/deserializedToken";

const app: Application = express();
const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  cors access handler
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Middleware to ensure database connection
app.use(async (req: Request, res: Response, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    logger.error("Database connection error:", error);
    res.status(500).json({
      status: false,
      message: "Database connection failed",
      error:
        process.env.NODE_ENV === "development"
          ? error
          : "Internal server error",
    });
  }
});

app.use(deserializedToken);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "API is running successfully",
    timestamp: new Date().toISOString(),
  });
});

routes(app);

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`);
  });
}

// Export for Vercel
export default app;
