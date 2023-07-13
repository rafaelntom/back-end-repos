import { z } from "zod";
import { zCreateAdressSchema } from "./adress.schema";

const zRealEstateSchema = z.object({
  id: z.number().positive(),
  sold: z.boolean().default(false),
  value: z.number().positive().default(0).or(z.string().max(12)),
  size: z.number().positive(),
  categoryId: z.number().positive(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  addressId: z.number(),
});

const zCreateRealEstateSchema = zRealEstateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    addressId: true,
  })
  .extend({ address: zCreateAdressSchema });

export { zRealEstateSchema, zCreateRealEstateSchema };
