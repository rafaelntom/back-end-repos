import "express-async-errors";
import express, { Application, json } from "express";
import { courseRouter, sessionRouter, usersRouter } from "./routers";
import errorHandler from "./middlewares/errorHandler.middleware";

const app: Application = express();
app.use(json());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter);

app.use(errorHandler);

export default app;
