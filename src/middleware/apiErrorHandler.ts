/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import statusCodes from 'http-status-codes';

import { logger } from '../shared';
import { ApiError } from '../controllers';

const { INTERNAL_SERVER_ERROR } = statusCodes;

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
  res.status(INTERNAL_SERVER_ERROR).json({
    message: "We've encounted an error. Please try again later!",
    stack
  });
};
