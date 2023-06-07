import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { developersRouter, projectsRouter } from "./routers";
import errorHandler from "./middlewares/errorHandler.middleware";

const app: Application = express();
app.use(express.json());

app.use("/developers", developersRouter);
app.use("/projects", projectsRouter);
app.use(errorHandler);

export default app;
