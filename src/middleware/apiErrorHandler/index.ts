/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { logger } from '../../lib';
import { ApiError } from '../../controllers';

export const apiErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'developement' ? err : {};

  const message = { message: err.message, stack };
  logger.error(JSON.stringify(message));

  // If error an instance of ApiError
  if (err instanceof ApiError) {
    res.status(err.code).json(message);
    return;
  }
  // Fallback to 500 error.
  res.status(500).json({
    message: "We've encounted an error. Please try again later!",
    stack
  });
};
