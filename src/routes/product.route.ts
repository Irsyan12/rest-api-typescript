import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller";
export const ProductRouter: Router = Router();

// sama seperti http://localhost:3000/product
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProducts);
ProductRouter.post("/", createProduct);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);
