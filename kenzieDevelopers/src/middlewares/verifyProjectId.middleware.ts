import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { AppError } from "../error";

const verifyProjectId = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;

  const queryString = `SELECT * FROM projects WHERE id = $1`;

  const queryResullt = await client.query(queryString, [id]);

  if (queryResullt.rowCount === 0) {
    const message = "Project not found.";
    throw new AppError(message, 404);
  }

  return next();
};

export default verifyProjectId;
