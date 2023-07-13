import "dotenv/config";
import { compare } from "bcryptjs";
import { AppError } from "../errors/errors";
import { TUser, TUserLogin } from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import { sign } from "jsonwebtoken";

const userLogin = async (payload: TUserLogin) => {
  const { email, password } = payload;

  const user: TUser | null = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (user === null) {
    throw new AppError("Invalid credentials", 401);
  }

  const validatedPassword: boolean = await compare(password, user.password);

  if (!validatedPassword) {
    throw new AppError("Invalid credentials", 401);
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

export default { userLogin };
