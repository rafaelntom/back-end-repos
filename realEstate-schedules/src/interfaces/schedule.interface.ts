import { z } from "zod";
import { zCreateScheduleSchema, zScheduleSchema } from "../schemas/schedule.schema";

type TSchedule = z.infer<typeof zScheduleSchema>;
type TCreateSchedule = z.infer<typeof zCreateScheduleSchema>;

export { TSchedule, TCreateSchedule };
