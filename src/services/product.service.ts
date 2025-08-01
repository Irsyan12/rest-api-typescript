import { logger } from "../utils/logger";
import productModel from "../models/product.model";
import ProductType from "../types/product.type";

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload);
};

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

export const getProductById = async (id: string) => {
  return await productModel.findOne({ product_id: id });
};

export const updateProductById = async (id: string, payload: ProductType) => {
  const result = await productModel.findOneAndUpdate(
    {
      product_id: id,
    },
    { $set: payload }
  );
  return result
};

export const deleteProductById = async (id: string) => {
  const result = await productModel.findOneAndDelete({ product_id: id });
  return result ? true : false;
};
