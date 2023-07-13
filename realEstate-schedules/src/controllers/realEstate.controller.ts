import { Request, Response } from "express";
import realEstateServices from "../services/realEstate.services";
import realEstateRepository from "../repositories/realEstate.repository";

const create = async (req: Request, res: Response) => {
  const newRealEstate = await realEstateServices.createRealEstate(req.body);

  return res.status(201).json(newRealEstate);
};

const read = async (req: Request, res: Response) => {
  const allRealEstates = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return res.status(200).json(allRealEstates);
};

export default { create, read };
