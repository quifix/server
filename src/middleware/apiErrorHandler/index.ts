import { Request, Response } from 'express';
import { logger } from '../../lib';
import { ApiError } from '../../controllers';

export const apiErrorHandler = (
  err: Error,
  _req: Request,
  res: Response
): void => {
  logger.error(err);
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json("We've encounted an error. Please try again later!");
};
