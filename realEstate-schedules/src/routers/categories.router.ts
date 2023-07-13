import { Router } from "express";
import verifyUserAdmin from "../middlewares/verifyUserAdmin.middleware";
import { categoryController } from "../controllers";
import validateToken from "../middlewares/validateToken.middleware";
import verifyCategoryName from "../middlewares/verifyCategoryName.middleware";
import validateRequestBody from "../middlewares/validadeRequestBody.middleware";
import { zCreateCategory } from "../schemas/category.schema";
import verifyCategoryId from "../middlewares/verifyCategoryId.middleware";

const categoriesRouter: Router = Router();

categoriesRouter.post(
  "",
  validateToken,
  verifyUserAdmin,
  validateRequestBody(zCreateCategory),
  verifyCategoryName,
  categoryController.create
);
categoriesRouter.get("", categoryController.read);
categoriesRouter.get(
  "/:id/realEstate",
  verifyCategoryId,
  categoryController.readRealEstateCategories
);

export default categoriesRouter;
