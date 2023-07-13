import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";
import realEstateRepository from "../repositories/realEstate.repository";

const verifyRealEstateId = async (req: Request, res: Response, next: NextFunction) => {
  const { realEstateId } = req.body;
  const checkRealEstates = await realEstateRepository.exist({
    where: {
      id: realEstateId,
    },
  });

  if (!checkRealEstates) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};

export default verifyRealEstateId;
