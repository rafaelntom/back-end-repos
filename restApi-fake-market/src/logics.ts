import { Request, Response } from "express";
import { market } from "./database";
import { ICleaningProduct, IFoodProduct, IProductNoDateNoId } from "./interfaces";

const formatExpirationDate = () => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 365);

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate =
    day.toString().padStart(2, "0") + "-" + month.toString().padStart(2, "0") + "-" + year;

  return formattedDate;
};

const getMarketPrices = () => {
  const sumMarketPrices = market
    .map((marketItem: IFoodProduct | ICleaningProduct) => {
      return marketItem.price;
    })
    .reduce((accumulator, value) => {
      if (typeof value === "number") {
        accumulator += value;
      }
      return accumulator;
    }, 0);

  return sumMarketPrices;
};

const generateItemId = () => {
  if (market.length <= 0) {
    const itemId = 1;

    return itemId;
  } else {
    const highestIdOnDataBase = Math.max.apply(
      null,
      market.map((makretProduct: IFoodProduct | ICleaningProduct) => makretProduct.id)
    );

    const itemId = highestIdOnDataBase + 1;

    return itemId;
  }
};

export const createProduct = (request: Request, response: Response): Response => {
  if (typeof request.body === "object" && Array.isArray(request.body)) {
    const products = request.body.map((product: IProductNoDateNoId) => {
      const productWithDescription: IFoodProduct | ICleaningProduct = {
        id: generateItemId(),
        expirationDate: formatExpirationDate(),
        ...product,
      };

      market.push(productWithDescription);

      return productWithDescription;
    });

    const sumMarketPrices = getMarketPrices();
    return response.status(201).json({ total: sumMarketPrices, marketProducts: products });
  } else if (typeof request.body === "object") {
    const product = request.body;
    const productWithDescription = {
      id: generateItemId(),
      expirationDate: formatExpirationDate(),
      ...product,
    };

    market.push(productWithDescription);
    const sumMarketPrices = getMarketPrices();
    return response.status(201).json({ total: sumMarketPrices, marketProducts: product });
  }

  const error = { error: "Request body not accepted" };
  return response.status(409).json(error);
};

export const readProducts = (request: Request, response: Response): Response => {
  const sumMarketPrices = getMarketPrices();
  return response.status(200).json({ total: sumMarketPrices, marketProducts: market });
};

export const getProductById = (request: Request, response: Response): Response => {
  const id: string = request.params.id;

  const foundProduct = market.find(
    (product: IFoodProduct | ICleaningProduct) => product.id === Number(id)
  );

  return response.status(200).json(foundProduct);
};

export const updateProduct = (request: Request, response: Response): Response => {
  const { id } = request.params;

  const findProductIndex = market.findIndex(
    (product: IFoodProduct | ICleaningProduct) => product.id === Number(id)
  );

  const newProduct: IFoodProduct | ICleaningProduct = {
    ...market[findProductIndex],
    ...request.body,
  };

  market[findProductIndex] = newProduct;

  return response.status(200).json(newProduct);
};

export const deleteProduct = (request: Request, response: Response) => {
  const { id } = request.params;

  const findProductIndex = market.findIndex(
    (product: IFoodProduct | ICleaningProduct) => product.id === Number(id)
  );

  market.splice(findProductIndex, 1);

  return response.status(204).json();
};
