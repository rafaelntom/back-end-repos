import { Request, Response, NextFunction } from "express";
import format from "pg-format";
import { Movie, MovieResult } from "./interfaces";
import { client } from "./database";

export const verifyIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = request.params;

  const queryString: string = format(`
  SELECT * FROM "movies" WHERE id=${id}
  `);

  const queryResult: MovieResult = await client.query(queryString);
  const foundMoive: Movie | undefined = queryResult.rows[0];

  if (!foundMoive) {
    const error = { error: "Movie not found!" };

    return response.status(404).json(error);
  }

  return next();
};

export const verifyNameExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = request.body;

  const queryString: string = format(`
    SELECT * FROM "movies" WHERE name='${name}'
    `);

  const queryResult: MovieResult = await client.query(queryString);
  const foundMoive: Movie | undefined = queryResult.rows[0];

  if (foundMoive) {
    const error = { error: "Movie name already exists!" };

    return response.status(409).json(error);
  }

  return next();
};
