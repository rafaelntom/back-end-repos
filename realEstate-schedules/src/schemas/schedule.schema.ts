import { z } from "zod";

const zScheduleSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().positive(),
  userId: z.number().positive(),
});

const zCreateScheduleSchema = zScheduleSchema.omit({ userId: true, id: true });

export { zCreateScheduleSchema, zScheduleSchema };
