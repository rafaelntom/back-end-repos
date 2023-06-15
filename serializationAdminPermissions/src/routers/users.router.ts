import { Router } from "express";
import { userController } from "../controllers";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";
import verifyUserEmail from "../middlewares/verifyEmail.middleware";
import { userCreate, userUpdate } from "../schemas/user.schema";
import validateToken from "../middlewares/validateToken.middleware";
import verifyUserPermision from "../middlewares/verifyUserPermission.middleware";

const usersRouter: Router = Router();

usersRouter.post(
  "",
  validateRequestBody(userCreate),
  verifyUserEmail,
  userController.createUser
);

usersRouter.get(
  "",
  validateToken,
  verifyUserPermision,
  validateRequestBody(userUpdate),
  userController.readUsers
);

usersRouter.get(
  "/:id/courses",
  validateToken,
  verifyUserPermision,
  userController.getUserCoures
);

export default usersRouter;
