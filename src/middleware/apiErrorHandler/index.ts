/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { logger } from '../../lib';
import { ApiError } from '../../controllers';

export const apiErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  const message = { message: err.message, stack };
  logger.error(JSON.stringify(message));

  if (err instanceof ApiError) {
    res.status(err.code).json(message);
    return;
  }

  res.status(500).json({
    message: "We've encounted an error. Please try again later!",
    stack
  });
};
