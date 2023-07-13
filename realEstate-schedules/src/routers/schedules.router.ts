import { Router } from "express";
import { scheduleController } from "../controllers";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { zCreateScheduleSchema } from "../schemas/schedule.schema";
import validateToken from "../middlewares/validateToken.middleware";
import verifyDateAndDay from "../middlewares/verifyDateAndDay.middleware";
import verifyRealEstateId from "../middlewares/verifyRealEstateId.middleware";
import verifyUserAdmin from "../middlewares/verifyUserAdmin.middleware";
import verifyRealEstateIdParams from "../middlewares/verifyRealEstateParam.middleware";
import verifyUserSchedule from "../middlewares/verifyUserSchedule.middleware";

const scheduleRouter: Router = Router();

scheduleRouter.post(
  "",
  validateToken,
  validateRequestBody(zCreateScheduleSchema),
  verifyRealEstateId,
  verifyDateAndDay,
  verifyUserSchedule,
  scheduleController.create
);
scheduleRouter.get(
  "/realEstate/:id",
  validateToken,
  verifyUserAdmin,
  verifyRealEstateIdParams,
  scheduleController.read
);

export default scheduleRouter;
