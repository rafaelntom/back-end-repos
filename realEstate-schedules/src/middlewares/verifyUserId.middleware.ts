import { NextFunction, Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/errors";

const verifyUserId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = Number(request.params.id);

  const foundUser = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (foundUser === null) {
    throw new AppError("User not found", 404);
  }

  response.locals = { ...response.locals, foundUser };

  return next();
};

export default verifyUserId;
