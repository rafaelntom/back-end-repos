import format from "pg-format";
import { client } from "../database";
import {
  TUserLogin,
  TUserResponse,
  TUserResult,
  User,
} from "../interfaces/user.interface";
import { TUserCreate } from "../__tests__/mocks/interfaces";
import { userResponse, userResponseArray } from "../schemas/user.schema";
import { hashSync } from "bcryptjs";
import { AppError } from "../errors/error";

const createNewUser = async (payload: TUserCreate): Promise<any> => {
  payload.password = hashSync(payload.password, 12);

  const queryString = format(
    `
    INSERT INTO 
        "users" (%I) 
    VALUES (%L)
    RETURNING *
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: TUserResult = await client.query(queryString);
  const parsedResult: TUserResponse = userResponse.parse(queryResult.rows[0]);
  return parsedResult;
};

const getAllUsers = async (payload: TUserCreate) => {
  const queryResult: TUserResult = await client.query(`SELECT * FROM users`);

  return userResponseArray.parse(queryResult.rows);
};

const getUserById = async (userId: string) => {
  const queryResult = await client.query(`
    SELECT 
      uc."courseId",
      c."name" "courseName",
      c.description "courseDescription",
      uc.active "userActiveInCourse",
      u.id "userId",
      u."name" "userName"
    FROM 
      "userCourses" uc 
    JOIN 
      users u ON u.id = uc."userId" 
    JOIN 
      courses c ON c.id = uc."courseId" 
    WHERE 
      u.id = ${userId};
  `);

  if (queryResult.rowCount === 0) {
    throw new AppError("No course found", 404);
  }

  return queryResult.rows;
};

export default { createNewUser, getAllUsers, getUserById };
