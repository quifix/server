import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../controllers';

export const verifyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    if (id === req.userID) {
      next();
    }
    res.status(403).json({ message: 'Unauthorized access!' });
  } catch (error) {
    return next(
      ApiError.internal(
        "We've encounted an error while verifying the user ID. Please try again later!"
      )
    );
  }
};
