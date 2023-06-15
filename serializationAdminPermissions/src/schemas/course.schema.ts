import { z } from "zod";

const zCourse = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  description: z.string(),
});

const zCourseCreate = zCourse.omit({ id: true });
const zCourseArray = zCourse.array();

export { zCourse, zCourseCreate, zCourseArray };
