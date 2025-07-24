import { Router } from "express";
import { registerUser } from "../controller/auth.controller";

export const AuthRouter: Router = Router();

// sama seperti http://localhost:3000/product
AuthRouter.post("/register", registerUser);
