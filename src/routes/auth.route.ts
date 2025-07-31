import { Router } from "express";
import { registerUser, createSession, refreshSession } from "../controller/auth.controller";

export const AuthRouter: Router = Router();

// sama seperti http://localhost:3000/product
AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", createSession);
AuthRouter.post("/refresh", refreshSession);
