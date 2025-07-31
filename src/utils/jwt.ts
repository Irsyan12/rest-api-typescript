import jwt from "jsonwebtoken";
import CONFIG from "../config/environtment";

export const signJwt = (payload: object, option?: jwt.SignOptions) => {
  return jwt.sign(payload, CONFIG.jwt_private, {
    ...(option && option),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded: any = jwt.verify(token, CONFIG.jwt_public);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt is expired or not eligible to use",
      decoded: null,
    };
  }
};

