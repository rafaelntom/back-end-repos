import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

const errorHandler = (
  error: Error & Partial<AppError>,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    return response.status(400).json({ message: error.flatten().fieldErrors });
  }

  console.error(error);
  return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
