import { Response } from "express";
import {
  TUser,
  TUserCreate,
  TUserReturn,
  TUserUpdate,
} from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import {
  zUpdateUserReturn,
  zUserReadSchema,
  zUserReturnSchema,
} from "../schemas/user.schema";

const createUser = async (payload: TUserCreate): Promise<TUserReturn> => {
  const newUser = userRepository.create(payload);
  await userRepository.save(newUser);

  return zUserReturnSchema.parse(newUser);
};

const getUsers = async () => {
  const allUsers = await userRepository.find();

  return zUserReadSchema.parse(allUsers);
};

const updateUser = async (payload: TUserUpdate, user: TUser) => {
  const updatedUser: TUserUpdate = await userRepository.save({ ...user, ...payload });

  return zUpdateUserReturn.parse(updatedUser);
};

const deleteUser = async (userId: number) => {
  await userRepository
    .createQueryBuilder("user")
    .softDelete()
    .where("id = :id", { id: userId })
    .execute();
};

export default { createUser, getUsers, updateUser, deleteUser };
