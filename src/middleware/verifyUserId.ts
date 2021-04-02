import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../controllers';

export const verifyUserId = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    if (id === req.userID) {
      next();
    } else {
      next(ApiError.unauthorized('Unauthorized access!'));
    }
  } catch (error) {
    return next(
      ApiError.internal(
        "We've encounted an  internal error. Please try again later!"
      )
    );
  }
};
