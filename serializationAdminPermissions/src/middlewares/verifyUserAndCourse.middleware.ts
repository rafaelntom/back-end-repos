import { NextFunction, Request, Response } from "express";
import { TUserResult } from "../interfaces/user.interface";
import { TCourseResult } from "../interfaces/course.interface";
import { client } from "../database";
import { AppError } from "../errors/error";

const verifyUserAndCourseExistence = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { userId, courseId } = request.params;

  const findUser: TUserResult = await client.query(`SELECT * FROM users WHERE id = $1`, [
    userId,
  ]);

  const findCourse: TCourseResult = await client.query(
    `SELECT * FROM courses WHERE id = $1`,
    [courseId]
  );

  if (findUser.rowCount === 0 || findCourse.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};

export default verifyUserAndCourseExistence;
