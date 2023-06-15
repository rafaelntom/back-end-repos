import { Request, Response } from "express";
import { courseServices } from "../services";
import { user } from "../schemas/user.schema";

const createCourse = async (request: Request, response: Response): Promise<Response> => {
  const { validatedRequest } = response.locals;

  const createdCourse = await courseServices.createNewCourse(validatedRequest);

  return response.status(201).json(createdCourse);
};

const readCourse = async (request: Request, response: Response): Promise<Response> => {
  const { validatedRequest } = response.locals;

  const foundCourses = await courseServices.getAllCourses(validatedRequest);

  return response.status(200).json(foundCourses);
};

const enrollUserCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { courseId, userId } = request.params;

  await courseServices.enrollUser(courseId, userId);

  return response.status(201).json({ message: "User successfully vinculed to course" });
};

const disableUserCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { courseId, userId } = request.params;

  await courseServices.deactivateCourse({
    courseId,
    userId,
  });

  return response.status(204).json();
};

const readUsersInSelectedCourse = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;

  const allUsersInSelectedCourse = await courseServices.listCourseUsers(id);

  return response.status(200).json(allUsersInSelectedCourse);
};

export default {
  createCourse,
  readCourse,
  enrollUserCourse,
  disableUserCourse,
  readUsersInSelectedCourse,
};
