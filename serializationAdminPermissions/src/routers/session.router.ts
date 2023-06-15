import { Router } from "express";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";
import { zSession } from "../schemas/session.schema";
import { sessionController } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", validateRequestBody(zSession), sessionController.create);

export default sessionRouter;
