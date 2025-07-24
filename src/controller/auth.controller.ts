import { Request, Response } from "express";
import { createUserValidation } from "../validations/auth.validation";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { hashing } from "../utils/hashing";
import { createUser } from "../services/auth.service";

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
