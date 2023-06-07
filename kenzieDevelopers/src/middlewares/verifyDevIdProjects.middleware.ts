import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../error";
import { QueryResult } from "pg";

const verifyDevIdForProjects = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { developerId } = request.body;

  const queryString = `SELECT * FROM developers WHERE id = $1`;

  const queryResullt: QueryResult = await client.query(queryString, [developerId]);

  if (queryResullt.rowCount === 0) {
    const message = "Developer not found.";
    throw new AppError(message, 404);
  }

  return next();
};

export default verifyDevIdForProjects;
