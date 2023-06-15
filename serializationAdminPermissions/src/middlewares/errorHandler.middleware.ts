import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/error";
import { z } from "zod";

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof z.ZodError) {
    return response.status(400).json(err.flatten().fieldErrors);
  }
  console.error(err);
  return response.status(500).json({ message: "Internal Server Error." });
};

export default errorHandler;
