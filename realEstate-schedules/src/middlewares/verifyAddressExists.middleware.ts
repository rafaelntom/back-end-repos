import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";

const verifyAddress = async (req: Request, res: Response, next: NextFunction) => {
  const { zipCode, number } = req.body.address;

  const addressRepo = AppDataSource.getRepository(Address);

  const addressAlreadyExists = await addressRepo.exist({
    where: {
      zipCode,
      number,
    },
  });

  if (addressAlreadyExists) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};

export default verifyAddress;
