import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    logger.warn("Access denied: No valid token provided");
    return res.status(401).send({
      status: false,
      StatusCode: 401,
      message: "Access denied. Valid token required",
      data: {},
    });
  }

  logger.info("User authenticated successfully");
  return next();
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user || user._doc.role !== "admin") {
    logger.warn("Access denied: Admin privileges required");
    return res.sendStatus(403);
  }

  logger.info("Admin access granted");
  return next();
}