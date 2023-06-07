import { Router } from "express";
import { developerController } from "../controllers";
import verifyEmail from "../middlewares/verifyEmail.middleware";
import verifyDeveloperId from "../middlewares/verifyDeveloperId.middleware";
import verifyOSTypes from "../middlewares/verifyOsTypes.middleware";

const developersRouter: Router = Router();

developersRouter.post("", verifyEmail, developerController.create);
developersRouter.get("/:id", verifyDeveloperId, developerController.read);
developersRouter.patch("/:id", verifyDeveloperId, verifyEmail, developerController.patch);
developersRouter.delete("/:id", verifyDeveloperId, developerController.deleteDev);
developersRouter.post(
  "/:id/infos",
  verifyDeveloperId,
  verifyOSTypes,
  developerController.createDevInfo
);

export default developersRouter;
