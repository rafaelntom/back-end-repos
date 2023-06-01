import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { addMovie, deleteMovie, getMovieById, getMovies, updateMovie } from "./logics";
import { verifyIdExists, verifyNameExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

const PORT: number = 3000;
const runningMessage = `Server is running on https://localhost:${PORT}`;

app.post("/movies", verifyNameExists, addMovie);
app.get("/movies", getMovies);
app.get("/movies/:id", verifyIdExists, getMovieById);
app.patch("/movies/:id", verifyIdExists, verifyNameExists, updateMovie);
app.delete("/movies/:id", verifyIdExists, deleteMovie);

app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMessage);
});
