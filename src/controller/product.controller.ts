import { Request, Response } from "express";
import {
  createProductValidation,
  deleteProductById,
  updateProductValidation,
} from "../validations/product.validation";
import { logger } from "../utils/logger";
import {
  addProductToDB,
  getProductById,
  getProductsFromDB,
  updateProductById,
} from "../services/product.service";
import { v4 as uuidv4 } from "uuid";
import ProductType from "../types/product.type";

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

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  const { error, value } = updateProductValidation(req.body);
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
    const result = await updateProductById(id, value);

    if (result) {
      logger.info("Success update new product data");
      return res.status(200).send({
        status: true,
        StatusCode: 200,
        message: "Update product success",
      });
    } else {
      logger.error("Product not found");
      return res.status(404).send({
        status: false,
        StatusCode: 404,
        message: "Product not found",
        data: {},
      });
    }
    // console.log(value)
  } catch (error) {
    logger.error("ERR = product - update", error);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error,
      data: {},
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const result = await deleteProductById(id);
    if (result) {
      logger.info("Success delete product data");
      return res.status(200).send({
        status: true,
        StatusCode: 200,
        message: "Delete product success",
      });
    } else {
      logger.info("Product not found");
      return res.status(404).send({
        status: false,
        StatusCode: 404,
        message: "Product not found",
      });
    }
  } catch (error) {
    logger.error("ERR = product - delete", error);
    return res.status(422).send({
      status: false,
      StatusCode: 422,
      message: error,
      data: {},
    });
  }
};
