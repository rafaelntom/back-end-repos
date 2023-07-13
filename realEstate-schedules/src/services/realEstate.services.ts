import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../errors/errors";
import {
  TCreateRealEstate,
  TRealEstate,
  TRealEstatePartial,
} from "../interfaces/realEstate.interface";
import categoryRepository from "../repositories/category.repository";
import realEstateRepository from "../repositories/realEstate.repository";

const createRealEstate = async (payload: any) => {
  const { address, categoryId, ...payloadRest } = payload;

  const addressRepo = AppDataSource.getRepository(Address);
  const newAddress = addressRepo.create(address);

  await addressRepo.save(newAddress);

  const foundCategory = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
  });

  const newRealEstate = realEstateRepository.create({
    address: newAddress,
    category: foundCategory,
    ...payloadRest,
  });

  await realEstateRepository.save(newRealEstate);

  return newRealEstate;
};

export default { createRealEstate };
