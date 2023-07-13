import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import categoryRepository from "../repositories/category.repository";

const verifyCategoryId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id =
    request.baseUrl === "/realEstate"
      ? Number(request.body.categoryId)
      : Number(request.params.id);

  const foundCategory = await categoryRepository.findOne({
    where: {
      id,
    },
  });

  if (!foundCategory) {
    throw new AppError("Category not found", 404);
  }

  response.locals = { ...response.locals, foundCategory };

  return next();
};

export default verifyCategoryId;
