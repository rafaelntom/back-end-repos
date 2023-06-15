import { z } from "zod";

const user = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
});

const userCreate = user.omit({ id: true });
const userResponseArray = user.omit({ password: true }).array();
const userResponse = user.omit({ password: true });
const userUpdate = userCreate.partial();
const userRead = user.array();
const userLogin = user.omit({ id: true, name: true, admin: true });

export {
  user,
  userCreate,
  userUpdate,
  userRead,
  userResponse,
  userLogin,
  userResponseArray,
};
