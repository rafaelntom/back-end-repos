import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../database";
import { TUserLogin, TUserResult, User } from "../interfaces/user.interface";
import { AppError } from "../errors/error";
import "dotenv/config";

const create = async (payload: TUserLogin) => {
  const { email, password } = payload;

  const queryResult: TUserResult = await client.query(
    `SELECT * FROM "users" WHERE email = $1`,
    [email]
  );

  const user: User = queryResult.rows[0];

  if (user === undefined) {
    throw new AppError("Wrong email/password", 401);
  }

  const validatePassword: boolean = compareSync(password, user.password);

  if (!validatePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  const token = sign(
    {
      email: user.email,
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: process.env.EXPIRES_IN,
      subject: String(user.id),
    }
  );

  return token;
};

export default { create };
