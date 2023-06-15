import { z } from "zod";

import { QueryResult } from "pg";
import {
  user,
  userCreate,
  userLogin,
  userRead,
  userResponse,
  userUpdate,
  userResponseArray,
} from "../schemas/user.schema";

type User = z.infer<typeof user>;

type TCreateUser = z.infer<typeof userCreate>;
type TUserResponse = z.infer<typeof userResponse>;
type TUpdateUser = z.infer<typeof userUpdate>;
type TUserLogin = z.infer<typeof userLogin>;
type TReadUser = z.infer<typeof userRead>;
type TUsersArray = z.infer<typeof userResponseArray>;

type TUserResult = QueryResult<User>;

export {
  User,
  TCreateUser,
  TUpdateUser,
  TReadUser,
  TUserResult,
  TUserResponse,
  TUserLogin,
  TUsersArray,
};
