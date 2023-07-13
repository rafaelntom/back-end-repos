import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateRequestBody =
  (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction) => {
    request.body = schema.parse(request.body);

    return next();
  };

export default validateRequestBody;
