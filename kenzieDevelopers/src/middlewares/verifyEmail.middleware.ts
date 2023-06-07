import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../error";

const verifyEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = request.body;

  const queryString = "SELECT * FROM developers WHERE email = $1";

  const queryResult = await client.query(queryString, [email]);

  if (queryResult.rowCount > 0) {
    const message: string = "E-mail already exists!";
    throw new AppError(message, 409);
  }

  return next();
};

export default verifyEmail;
