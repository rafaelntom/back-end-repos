import { z } from "zod";
import {
  zCreateUserSchema,
  zUpdateUserSchema,
  zUserLoginSchema,
  zUserReadSchema,
  zUserReturnSchema,
  zUserSchema,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof zUserSchema>;
type TUserReturn = z.infer<typeof zUserReturnSchema>;
type TUserRead = z.infer<typeof zUserReadSchema>;
type TUserCreate = z.infer<typeof zCreateUserSchema>;
type TUserUpdate = DeepPartial<typeof zUpdateUserSchema>;

type TUserLogin = z.infer<typeof zUserLoginSchema>;

export { TUser, TUserReturn, TUserRead, TUserCreate, TUserUpdate, TUserLogin };
