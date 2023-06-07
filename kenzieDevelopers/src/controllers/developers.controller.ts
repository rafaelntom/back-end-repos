import { Request, Response } from "express";
import { IDeveloper } from "../interfaces/interfaces";
import { developerServices } from "../services";

const create = async (request: Request, response: Response): Promise<Response> => {
  const newDeveloper: IDeveloper = await developerServices.createNewDeveloper(
    request.body
  );
  return response.status(201).json(newDeveloper);
};

const read = async (request: Request, response: Response): Promise<Response> => {
  const developer: IDeveloper = await developerServices.getDevelopers(request.params.id);

  return response.status(200).json(developer);
};

const patch = async (request: Request, response: Response): Promise<Response> => {
  const patchedDeveloper: IDeveloper = await developerServices.patchDeveloper(
    request.body,
    request.params.id
  );

  return response.status(200).json(patchedDeveloper);
};

const deleteDev = async (request: Request, response: Response): Promise<Response> => {
  await developerServices.deleteDeveloper(request.params.id);
  return response.status(204).json();
};

const createDevInfo = async (request: Request, response: Response): Promise<Response> => {
  const createdInfo = await developerServices.createDeveloperInfo(
    request.body,
    request.params.id
  );

  return response.status(201).json(createdInfo);
};

export default { create, read, patch, deleteDev, createDevInfo };
