import { NextFunction, Request, Response } from "express";
import Joi from "joi";
export default function checkJoi(schema: Joi.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.validateAsync(req.body);
      value && next();
    } catch (error) {
      res.json(error);
    }
  };
}
