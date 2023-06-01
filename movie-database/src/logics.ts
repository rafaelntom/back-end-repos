import { Request, Response } from "express";
import { client } from "./database";
import { CreateMovie, Movie, MovieResult } from "./interfaces";
import format from "pg-format";
import { QueryConfig } from "pg";

export const addMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload: CreateMovie = request.body;

  const queryString: string = format(
    `
    INSERT INTO "movies" (%I)
    VALUES (%L)
    RETURNING *
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: MovieResult = await client.query(queryString);
  const product: Movie = queryResult.rows[0];

  return response.status(201).json(product);
};

export const getMovies = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { category } = request.query;

  if (category) {
    const queryResult: MovieResult = await client.query(
      `SELECT * FROM movies WHERE category = '${category}'`
    );
    const allMovies: Movie[] | Movie = queryResult.rows;

    if (allMovies.length <= 0) {
      const queryResult: MovieResult = await client.query(`SELECT * FROM movies`);
      const allMovies: Movie[] | Movie = queryResult.rows;

      return response.status(200).json(allMovies);
    }
    return response.status(200).json(allMovies);
  }

  const queryResult: MovieResult = await client.query(` SELECT * FROM movies`);
  const allMovies: Movie[] | Movie = queryResult.rows;

  return response.status(200).json(allMovies);
};

export const getMovieById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const queryResult: MovieResult = await client.query(
    `SELECT * FROM "movies" WHERE id=${id}`
  );
  const allMovies: Movie[] | Movie = queryResult.rows[0];

  return response.status(200).json(allMovies);
};

export const updateMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const payload = request.body;

  const { id } = request.params;

  const queryString: string = format(
    `
  UPDATE "movies"
  SET (%I) = ROW(%L)
  WHERE id=${id}
  RETURNING *;
  `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: MovieResult = await client.query(queryString);
  const updatedMovie: Movie = queryResult.rows[0];

  return response.status(200).json(updatedMovie);
};

export const deleteMovie = async (
  request: Request,
  response: Response
): Promise<Response> => {
  await client.query("DELETE FROM movies WHERE id = $1", [request.params.id]);

  return response.status(204).json();
};
