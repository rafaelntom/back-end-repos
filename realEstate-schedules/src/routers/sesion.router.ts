import { Router } from "express";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { zUserLoginSchema } from "../schemas/user.schema";
import sessionController from "../controllers/session.controller";

const sessionRouter: Router = Router();

sessionRouter.post("", validateRequestBody(zUserLoginSchema), sessionController.create);

export default sessionRouter;
