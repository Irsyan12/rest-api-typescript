import Joi from "joi";
import ProductType from "../types/product.type";
import productModel from "../models/product.model";

export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow("", null),
    size: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow("", null),
    price: Joi.number().allow("", null),
    size: Joi.string().allow("", null),
  });

  return schema.validate(payload);
};

export const deleteProductById = async (id: string) => {
  return await productModel.findOneAndDelete({ product_id: id });
}