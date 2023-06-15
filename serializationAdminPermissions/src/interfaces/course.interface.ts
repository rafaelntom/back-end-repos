import { z } from "zod";
import { zCourse, zCourseArray, zCourseCreate } from "../schemas/course.schema";
import { QueryResult } from "pg";

type TCourse = z.infer<typeof zCourse>;
type TCourseCreate = z.infer<typeof zCourseCreate>;
type TCourseArray = z.infer<typeof zCourseArray>;

type TCourseResult = QueryResult<TCourse>;

export { TCourse, TCourseResult, TCourseCreate, TCourseArray };
