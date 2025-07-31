import { Request, Response } from "express";
import {
  createSessionValidation,
  createUserValidation,
  refreshSessionValidation,
} from "../validations/auth.validation";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { checkPassword, hashing } from "../utils/hashing";
import { createUser, findUserByEmail } from "../services/auth.service";
import { signJwt, verifyJwt } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  req.body.userId = uuidv4();
  const { error, value } = createUserValidation(req.body);

  if (error) {
    logger.error("ERR = auth - register", error.details[0].message);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error.details[0].message,
      data: {},
    });
  }

  try {
    value.password = `${hashing(value.password)}`;

    await createUser(value);
    return res.status(201).send({
      status: true,
      StatusCode: 201,
      message: "User registration successful",
      data: {
        userId: value.userId,
        email: value.email,
        name: value.name,
        role: value.role,
      },
    });
  } catch (error) {
    logger.error("ERR = auth - register", error);

    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error,
      data: {},
    });
  }
};

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body);

  if (error) {
    logger.error("ERR = auth - create session", error.details[0].message);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error.details[0].message,
      data: {},
    });
  }

  try {
    const user: any = await findUserByEmail(value.email);
    const isValid = checkPassword(value.password, user.password);

    if (!isValid) {
      logger.error("ERR = auth - create session", "Invalid email or password");
      return res.status(401).send({
        status: false,
        StatusCode: 401,
        message: "Invalid email or password",
        data: {},
      });
    }

    const accessToken = signJwt({ ...user }, { expiresIn: "5s" });
    const refreshToken = signJwt({ ...user }, { expiresIn: "7d" });

    return res.status(200).send({
      status: true,
      StatusCode: 200,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    logger.error("ERR = auth - create session", error.message);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error.message,
      data: {},
    });
  }
};

export const refreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body);

  if (error) {
    logger.error("ERR = auth - refresh session", error.details[0].message);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error.details[0].message,
      data: {},
    });
  }

  try {
    // Verify refresh token
    const tokenResult: any = verifyJwt(value.refreshToken);

    // Check if token verification failed
    if (!tokenResult.valid || !tokenResult.decoded) {
      logger.error("ERR = auth - refresh session", "Invalid refresh token");
      return res.status(401).send({
        status: false,
        StatusCode: 401,
        message: "Invalid or expired refresh token",
        data: {},
      });
    }

    const { decoded } = tokenResult;

    // Find user by email (assuming JWT payload contains email)
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      logger.error("ERR = auth - refresh session", "User not found");
      return res.status(404).send({
        status: false,
        StatusCode: 404,
        message: "User not found",
        data: {},
      });
    }

    // Generate new access token
    const accessToken = signJwt(
      {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      { expiresIn: "1d" }
    );

    logger.info("Refresh token successful for user:", user.email);
    return res.status(200).send({
      status: true,
      StatusCode: 200,
      message: "Refresh token successful",
      data: {
        accessToken,
      },
    });
  } catch (error: any) {
    logger.error("ERR = auth - refresh session", error);
    return res.status(401).send({
      status: false,
      StatusCode: 401,
      message: "Invalid refresh token",
      data: {},
    });
  }
};
