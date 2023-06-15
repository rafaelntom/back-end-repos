import { NextFunction, Request, Response } from "express";
import { z } from "zod";
const validateRequestBody =
  (schema: z.AnyZodObject) =>
  (request: Request, response: Response, next: NextFunction) => {
    const validatedRequest = schema.parse(request.body);
    response.locals = { ...response.locals, validatedRequest };

    return next();
  };

export default validateRequestBody;
