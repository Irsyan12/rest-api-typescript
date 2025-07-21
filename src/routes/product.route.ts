import { Request, Response, NextFunction, Router } from "express";
import { createProduct, getProducts } from "../controller/product.controller";

export const ProductRouter: Router = Router();

// sama seperti http://localhost:3000/product
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProducts);
ProductRouter.post("/", createProduct);
