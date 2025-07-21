import { Request, Response } from "express";
import { createProductValidation } from "../validations/product.validation";
import { logger } from "../utils/logger";
import { addProductToDB, getProductsFromDB } from "../services/product.service";
import { v4 as uuidv4 } from "uuid";
import ProductType from "../types/product.type";
import productModel from "../models/product.model";
import { date } from "joi/lib";

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4(); // Generate a unique product ID
  const { error, value } = createProductValidation(req.body);
  if (error) {
    logger.error("ERR = product - create", error.details[0].message);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error.details[0].message,
      data: {},
    });
  }
  try {
    await addProductToDB(value);
    logger.info("Success add new product data");
    return res.status(201).send({
      status: true,
      StatusCode: 201,
      message: "Add product success",
    });
  } catch (error) {
    logger.error("ERR = product - create", error);
    return res.status(500).send({
      status: false,
      StatusCode: 500,
      message: error,
      data: {},
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  if (id) {
    const product = await getProductById(id);
    if (product) {
      logger.info("Success get product data by name");
      return res.status(200).send({
        status: true,
        StatusCode: 200,
        data: product,
      });
    } else {
      logger.error("Product not found");
      return res.status(404).send({
        status: false,
        StatusCode: 404,
        message: "Product not found",
        date: {},
      });
    }
  } else {
    const products: any = await getProductsFromDB();

    logger.info("Success get product data");
    return res.status(200).send({
      status: true,
      StatusCode: 200,
      data: products,
    });
  }
};

export const getProductById = async (id: string) => {
  return await productModel.findOne({ product_id: id });
};
