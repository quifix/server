import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../controllers';

export const asyncHandler = (
  controller: (req: Request, res: Response, next: NextFunction) => void
) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(controller(req, res, next)).catch(err => {
    next(ApiError.internal(err.message));
    return;
  });
};
