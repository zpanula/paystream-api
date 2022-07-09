import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import AppError from '../utils/error.js';
import logger from '../utils/logger.js';

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line
  next: NextFunction
) => {
  logger.error(err);

  if (err instanceof AppError)
    return res.status(err.statusCode).send(err.message);

  if (err instanceof SyntaxError) return res.status(400).send(err.message);

  return res.status(500).send(err.message);
};

export default errorHandler;
