import { logger } from "../utils/logger";
import productModel from "../models/product.model";
import ProductType from "../types/product.type";

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}


export const getProductsFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      logger.info("ERR = product - getProductsFromDB", err);
    });
};
