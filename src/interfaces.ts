import { QueryResult } from "pg";

export interface Movie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

export type CreateMovie = Omit<Movie, "id">;
export type MovieResult = QueryResult<Movie>;
