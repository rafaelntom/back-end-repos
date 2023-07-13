import { Request, Response } from "express";
import sessionServices from "../services/session.services";

const create = async (request: Request, response: Response): Promise<any> => {
  const payload = request.body;

  const token = await sessionServices.userLogin(payload);

  return response.status(200).json({ token });
};

export default { create };
