import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../errors/error";

const verifyUserEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = request.body;

  const queryResult = await client.query(
    `
  SELECT * FROM users WHERE "email" = $1;
  `,
    [email]
  );

  if (queryResult.rowCount > 0) {
    throw new AppError("Email already registered", 409);
  }

  return next();
};

export default verifyUserEmail;
