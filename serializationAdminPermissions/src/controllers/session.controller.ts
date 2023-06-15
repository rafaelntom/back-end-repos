import { Request, Response } from "express";
import { sessionServices } from "../services";

const create = async (request: Request, response: Response): Promise<Response> => {
  const { validatedRequest } = response.locals;

  const token: string = await sessionServices.create(validatedRequest);

  return response.status(200).json({ token });
};

export default { create };
