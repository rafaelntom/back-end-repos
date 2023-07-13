import { TCreateCategory, TReadCategories } from "../interfaces/category.interface";
import categoryRepository from "../repositories/category.repository";

const createCategory = async (payload: TCreateCategory) => {
  const newCategory: TCreateCategory = categoryRepository.create(payload);
  await categoryRepository.save(newCategory);

  return newCategory;
};

const getAllCategories = async () => {
  const allCategories: TReadCategories = await categoryRepository.find();

  return allCategories;
};

const realEstateCategories = async (id: number) => {
  const findRealEstatesInsideCategory = await categoryRepository.findOne({
    where: {
      id,
    },
    relations: {
      realEstate: true,
    },
  });

  return findRealEstatesInsideCategory;
};

export default { createCategory, getAllCategories, realEstateCategories };
