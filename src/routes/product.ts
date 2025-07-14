import { Request, Response, NextFunction, Router } from "express";

export const ProductRouter: Router = Router();

// sama seperti http://localhost:3000/product
ProductRouter.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: true, StatusCode: 200, data: [{ name: "baju CMD", price: 500000}] });
  }
);
