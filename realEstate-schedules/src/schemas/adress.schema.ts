import { z } from "zod";

const zAdressSchema = z.object({
  id: z.number().positive(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const zCreateAdressSchema = zAdressSchema.omit({ id: true });

export { zAdressSchema, zCreateAdressSchema };
