import { NextFunction, Request, Response } from "express";
import { TypesOS } from "../interfaces/interfaces";
import { AppError } from "../error";

const verifyOSTypes = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { preferredOS } = request.body;

  const allowedOSTypes: TypesOS[] = ["Windows", "MacOS", "Linux"];

  if (!allowedOSTypes.includes(preferredOS)) {
    const message = `Invalid OS option, please choose between ${allowedOSTypes.join(
      ", "
    )}`;
    throw new AppError(message, 400);
  }

  return next();
};

export default verifyOSTypes;
