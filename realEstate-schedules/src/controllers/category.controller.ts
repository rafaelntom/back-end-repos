import { Request, Response } from "express";
import categoryServices from "../services/category.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const newCategory = await categoryServices.createCategory(req.body);

  return res.status(201).json(newCategory);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const allCategories = await categoryServices.getAllCategories();

  return res.status(200).json(allCategories);
};

const readRealEstateCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);

  const foundRealEstates = await categoryServices.realEstateCategories(id);

  return res.status(200).json(foundRealEstates);
};

export default { create, read, readRealEstateCategories };
