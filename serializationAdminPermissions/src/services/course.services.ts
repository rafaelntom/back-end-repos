import format from "pg-format";
import { client } from "../database";
import {
  TCourse,
  TCourseArray,
  TCourseCreate,
  TCourseResult,
} from "../interfaces/course.interface";
import { zCourse } from "../schemas/course.schema";
import { QueryResult } from "pg";

const createNewCourse = async (payload: TCourseCreate): Promise<TCourse> => {
  const queryString = format(
    `
      INSERT INTO 
          "courses" (%I) 
      VALUES (%L)
      RETURNING *
      `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: TCourseResult = await client.query(queryString);
  const parsedResult: TCourse = zCourse.parse(queryResult.rows[0]);
  return parsedResult;
};

const getAllCourses = async (payload: TCourse): Promise<TCourseArray> => {
  const queryResult: TCourseResult = await client.query(`SELECT * FROM "courses"`);

  const allCourses: TCourseArray = queryResult.rows;

  return allCourses;
};

const enrollUser = async (userId: string, courseId: string) => {
  const queryString: string = `
    INSERT INTO 
      "userCourses" (active, "userId", "courseId")
    VALUES
      (true, ${userId}, ${courseId})
    RETURNING *
  `;

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult;
};

const deactivateCourse = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  const queyrString = `
    UPDATE 
      "userCourses"
    SET 
      "active" = false
    WHERE
      "userId" = ${userId} AND "courseId" = ${courseId}
    RETURNING *;
  `;

  const queryResult = await client.query(queyrString);

  return queryResult;
};

const listCourseUsers = async (courseId: string) => {
  const queryString = `
    SELECT 
      u.id "userId",
      u."name" "userName",
      c.id "courseId",
      c."name" "courseName",
      c.description "courseDescription",
      uc.active "userActiveInCourse"
    FROM 
      "userCourses" uc
    JOIN 
      users u ON u.id = uc."userId"
    JOIN 
      courses c ON c.id = uc."courseId"
    WHERE c.id = ${courseId};
  `;

  const queryResult: QueryResult = await client.query(queryString);

  return queryResult.rows;
};

export default {
  createNewCourse,
  getAllCourses,
  enrollUser,
  deactivateCourse,
  listCourseUsers,
};
