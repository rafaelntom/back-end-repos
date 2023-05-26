import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { ICleaningProduct, IFoodProduct, IProductNoDateNoId } from "./interfaces";

export const verifyProductExistenceMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  const productIndex = market.findIndex((product) => product.id === parseInt(id));

  if (productIndex === -1) {
    const error = { error: "Product not found" };
    return response.status(404).json(error);
  }

  return next();
};

export const verifyProductName = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (typeof request.body === "object" && Array.isArray(request.body)) {
    const productNames = request.body.map((product: IProductNoDateNoId) => {
      return product.name;
    });

    for (let i = 0; i < productNames.length; i++) {
      const itemNameExists = market.some((product) => {
        return product.name === productNames[i];
      });

      if (itemNameExists) {
        const error = { error: `Product already exists!` };
        return response.status(409).json(error);
      }
    }
  } else if (typeof request.body === "object") {
    const productName = request.body.name;

    const itemNameExists = market.some((product: IFoodProduct | ICleaningProduct) => {
      return product.name === productName;
    });

    if (itemNameExists) {
      const error = { error: `Product already exists!` };
      return response.status(409).json(error);
    }
  }

  return next();
};

export const verifyRequestKeys = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const allowedKeys = ["name", "price", "weight", "calories"];

  const requestKeys = Object.keys(request.body);

  const verifyKeys = requestKeys.filter((key) => !allowedKeys.includes(key));

  if (verifyKeys.length > 0) {
    const error = {
      error: `You are not allowed to change the [${verifyKeys.join(
        ", "
      )}] values, the only values allowed to modified are ${allowedKeys}`,
    };
    return response.status(409).json(error);
  }

  next();
};
