import { Router } from "express";

import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { zCreateUserSchema, zUpdateUserSchema } from "../schemas/user.schema";
import { usersController } from "../controllers";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import verifyUserPermision from "../middlewares/verifyUserPermission.middleware";
import validateToken from "../middlewares/validateToken.middleware";
import verifyUserId from "../middlewares/verifyUserId.middleware";
import verifyUserAdmin from "../middlewares/verifyUserAdmin.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateRequestBody(zCreateUserSchema),
  verifyEmail,
  usersController.create
);
userRouter.get("", validateToken, verifyUserPermision, usersController.read);
userRouter.patch(
  "/:id",
  validateToken,
  verifyUserId,
  verifyUserPermision,
  validateRequestBody(zUpdateUserSchema),
  verifyEmail,
  usersController.update
);
userRouter.delete(
  "/:id",
  validateToken,
  verifyUserId,
  verifyUserAdmin,
  usersController.remove
);

export default userRouter;
