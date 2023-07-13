import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.middleware";
import { categoriesRouter, realEstateRouter, sessionRouter, userRouter } from "./routers";
import scheduleRouter from "./routers/schedules.router";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/realEstate", realEstateRouter);
app.use("/schedules", scheduleRouter);

app.use(errorHandler);

export default app;
