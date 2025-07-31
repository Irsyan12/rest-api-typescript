import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import { logger } from "../utils/logger";

export const deserializedToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }

  const token: any = verifyJwt(accessToken);

  if (token.valid && token.decoded) {
    res.locals.user = token.decoded;
    logger.info("Token deserialized successfully");
    return next();
  }

  if (token.expired) {
    logger.warn("Access attempt with expired token");
    return next();
  }

  // Token invalid (not expired but not valid)
  logger.warn("Access attempt with invalid token");
  return next();
};

export default deserializedToken;
