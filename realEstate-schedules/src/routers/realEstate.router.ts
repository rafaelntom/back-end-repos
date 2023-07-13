import { Router } from "express";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { zCreateRealEstateSchema } from "../schemas/realEstate.schema";
import verifyCategoryId from "../middlewares/verifyCategoryId.middleware";
import { realEstateController } from "../controllers";
import validateToken from "../middlewares/validateToken.middleware";
import verifyUserPermision from "../middlewares/verifyUserPermission.middleware";
import verifyAddress from "../middlewares/verifyAddressExists.middleware";

const realEstateRouter: Router = Router();

realEstateRouter.post(
  "",
  validateToken,
  verifyUserPermision,
  validateRequestBody(zCreateRealEstateSchema),
  verifyAddress,
  verifyCategoryId,
  realEstateController.create
);
realEstateRouter.get("", realEstateController.read);

export default realEstateRouter;
