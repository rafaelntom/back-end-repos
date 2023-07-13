import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import categoryRepository from "../repositories/category.repository";

const verifyCategoryName = async (req: Request, res: Response, next: NextFunction) => {
  const categoryExists = await categoryRepository.exist({
    where: {
      name: req.body.name,
    },
  });

  if (categoryExists) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export default verifyCategoryName;
