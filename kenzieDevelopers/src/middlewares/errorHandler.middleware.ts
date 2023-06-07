import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);
  return response.status(500).json({ message: "Internal Server Error." });
};

export default errorHandler;
