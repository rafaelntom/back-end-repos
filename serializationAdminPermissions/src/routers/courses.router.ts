import { Router } from "express";
import validateRequestBody from "../middlewares/validateRequestBody.middleware";
import { zCourseCreate } from "../schemas/course.schema";
import courseController from "../controllers/course.controller";
import validateToken from "../middlewares/validateToken.middleware";
import verifyUserPermision from "../middlewares/verifyUserPermission.middleware";
import verifyUserAndCourseExistence from "../middlewares/verifyUserAndCourse.middleware";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  validateToken,
  verifyUserPermision,
  validateRequestBody(zCourseCreate),
  courseController.createCourse
);
courseRouter.get("", courseController.readCourse);
courseRouter.post(
  "/:courseId/users/:userId",
  validateToken,
  verifyUserPermision,
  verifyUserAndCourseExistence,
  courseController.enrollUserCourse
);
courseRouter.delete(
  "/:courseId/users/:userId",
  validateToken,
  verifyUserPermision,
  verifyUserAndCourseExistence,
  courseController.disableUserCourse
);
courseRouter.get(
  "/:id/users",
  validateToken,
  verifyUserPermision,
  courseController.readUsersInSelectedCourse
);

export default courseRouter;
