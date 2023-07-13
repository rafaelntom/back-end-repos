import { z } from "zod";
import {
  zCategorySchema,
  zCreateCategory,
  zReadCategories,
} from "../schemas/category.schema";

type TCategory = z.infer<typeof zCategorySchema>;
type TCreateCategory = z.infer<typeof zCreateCategory>;
type TReadCategories = z.infer<typeof zReadCategories>;

export { TCategory, TCreateCategory, TReadCategories };
