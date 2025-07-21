import { Request, Response, NextFunction, Router } from "express";
import { logger } from "../utils/logger";

export const HeathRouter: Router = Router();

// sama seperti http://localhost:3000/health
HeathRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    logger.info("Health check endpoint hit");
    res.status(200).send({ status: "200" });
  }
);
