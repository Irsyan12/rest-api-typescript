import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller";
import { requireAdmin, requireUser } from "../middleware/auth";
export const ProductRouter: Router = Router();

// sama seperti http://localhost:3000/product
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProducts);
ProductRouter.post("/", requireAdmin, createProduct);
ProductRouter.put("/:id", requireAdmin, updateProduct);
ProductRouter.delete("/:id", requireAdmin, deleteProduct);
