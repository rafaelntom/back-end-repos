import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import realEstateRepository from "../repositories/realEstate.repository";

const verifyRealEstateIdParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  const checkRealEstates = await realEstateRepository.exist({
    where: {
      id,
    },
  });

  if (!checkRealEstates) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export default verifyRealEstateIdParams;
