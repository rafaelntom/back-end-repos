import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../error";
import { DeveloperResult, IDeveloper } from "../interfaces/interfaces";

const verifyDeveloperId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;

  const queryResullt: DeveloperResult = await client.query(
    "SELECT * FROM developers WHERE id = $1",
    [id]
  );

  if (queryResullt.rowCount === 0) {
    const message = "Developer not found";
    throw new AppError(message, 404);
  }

  return next();
};

export default verifyDeveloperId;
