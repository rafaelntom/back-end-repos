import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { AppError } from "../errors/error";
import "dotenv/config";

const validateToken = (request: Request, response: Response, next: NextFunction) => {
  const authorization: string | undefined = request.headers.authorization!;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = authorization.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    response.locals = { ...response.locals, decoded };
  });

  return next();
};

export default validateToken;
