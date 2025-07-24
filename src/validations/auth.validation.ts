import Joi from "joi";
import UserType from "../types/user.type";

export const createUserValidation = (payload: UserType) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().allow("", null),
    password: Joi.string().min(6).allow("", null),
    role: Joi.string().valid("regular", "admin").allow("", null),
  });

  return schema.validate(payload);
};
