import { Request, Response } from "express";
import { userServices } from "../services";

const createUser = async (request: Request, response: Response): Promise<Response> => {
  const newDeveloper = await userServices.createNewUser(response.locals.validatedRequest);

  return response.status(201).json(newDeveloper);
};

const readUsers = async (request: Request, response: Response): Promise<Response> => {
  const { validatedRequest } = response.locals;

  const allUsers = await userServices.getAllUsers(validatedRequest);

  return response.status(200).json(allUsers);
};

const getUserCoures = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;

  const userCoursesList = await userServices.getUserById(id);

  return response.status(200).json(userCoursesList);
};

export default { createUser, readUsers, getUserCoures };
