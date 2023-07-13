import { z } from "zod";
import { zCreateRealEstateSchema, zRealEstateSchema } from "../schemas/realEstate.schema";
import { DeepPartial } from "typeorm";

type TRealEstate = z.infer<typeof zRealEstateSchema>;
type TCreateRealEstate = z.infer<typeof zCreateRealEstateSchema>;
type TRealEstatePartial = DeepPartial<typeof zCreateRealEstateSchema>;

export { TRealEstate, TCreateRealEstate, TRealEstatePartial };
