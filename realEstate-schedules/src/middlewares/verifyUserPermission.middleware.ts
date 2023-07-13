import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

const verifyUserPermision = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;
  const { sub, admin } = response.locals.decoded;

  if (admin) {
    return next();
  }

  if (id !== sub && !admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyUserPermision;
