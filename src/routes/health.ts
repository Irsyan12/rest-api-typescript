import { Request, Response, NextFunction, Router } from "express";

export const HeathRouter: Router = Router();

// sama seperti http://localhost:3000/health
HeathRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: "200" });
  }
);
