import { Request, Response } from "express";
import { projectsServices } from "../services";
import { IProject } from "../interfaces/interfaces";

const createProject = async (request: Request, response: Response) => {
  const newProject: IProject = await projectsServices.createNewProject(request.body);

  return response.status(201).json(newProject);
};

const readProject = async (request: Request, response: Response) => {
  const id = request.params.id;
  const foundProject = await projectsServices.getProjectById(id);

  return response.status(200).json(foundProject);
};

const updateProject = async (request: Request, response: Response) => {
  const patchedProject = await projectsServices.updateProject(
    request.body,
    request.params.id
  );

  return response.status(200).json(patchedProject);
};

export default { createProject, readProject, updateProject };
