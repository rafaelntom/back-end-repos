import { z } from "zod";

const zUserSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

const zUserReturnSchema = zUserSchema.omit({ password: true });
const zUserReadSchema = zUserReturnSchema.array();
const zCreateUserSchema = zUserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const zUserLoginSchema = zCreateUserSchema.extend({}).omit({ name: true, admin: true });

const zUpdateUserSchema = zUserSchema.omit({ admin: true, password: true }).partial();
const zUpdateUserReturn = zUserSchema.omit({ password: true }).partial();

export {
  zUserSchema,
  zCreateUserSchema,
  zUpdateUserSchema,
  zUserReturnSchema,
  zUserReadSchema,
  zUserLoginSchema,
  zUpdateUserReturn,
};
