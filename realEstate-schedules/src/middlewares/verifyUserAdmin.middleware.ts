import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

const verifyUserAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = response.locals.decoded;

  if (admin) {
    return next();
  }

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyUserAdmin;
