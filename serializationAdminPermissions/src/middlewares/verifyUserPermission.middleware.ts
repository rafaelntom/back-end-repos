import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/error";

const verifyUserPermision = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId } = request.params;
  const { sub, admin } = response.locals.decoded;

  if (admin) {
    return next();
  }

  if (userId !== sub) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyUserPermision;
