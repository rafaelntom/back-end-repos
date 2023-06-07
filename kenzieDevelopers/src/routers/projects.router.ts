import { Router } from "express";
import { projectsController } from "../controllers";
import verifyProjectId from "../middlewares/verifyProjectId.middleware";
import verifyDevIdForProjects from "../middlewares/verifyDevIdProjects.middleware";

const projectsRouter: Router = Router();

projectsRouter.post("", verifyDevIdForProjects, projectsController.createProject);
projectsRouter.get("/:id", verifyProjectId, projectsController.readProject);
projectsRouter.patch(
  "/:id",
  verifyProjectId,
  verifyDevIdForProjects,
  projectsController.updateProject
);

export default projectsRouter;
