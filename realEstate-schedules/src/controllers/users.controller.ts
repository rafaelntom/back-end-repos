import { Request, Response } from "express";
import userServices from "../services/user.services";

const create = async (req: Request, res: Response) => {
  const userData = req.body;

  const newUser = await userServices.createUser(userData);

  return res.status(201).json(newUser);
};

const read = async (req: Request, res: Response) => {
  const allUsers = await userServices.getUsers();
  return res.status(200).json(allUsers);
};

const update = async (req: Request, res: Response) => {
  const { foundUser } = res.locals;
  const payload = req.body;

  const userUpdate = await userServices.updateUser(payload, foundUser);

  return res.status(200).json(userUpdate);
};

const remove = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  await userServices.deleteUser(userId);

  return res.status(204).json();
};

export default { create, read, update, remove };
