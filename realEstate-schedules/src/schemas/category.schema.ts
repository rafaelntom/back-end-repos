import { z } from "zod";

const zCategorySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

const zCreateCategory = zCategorySchema.omit({ id: true });
const zReadCategories = zCreateCategory.array();

export { zCreateCategory, zCategorySchema, zReadCategories };
