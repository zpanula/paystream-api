import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import AppError from '../utils/error.js';

const validateBody =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = Joi.compile(schema).validate(req.body);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new AppError(400, errorMessage));
    }

    Object.assign(req, value);
    return next();
  };

export default validateBody;
