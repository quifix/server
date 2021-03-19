import { NextFunction, Request, Response } from 'express';
import { Bid, Project } from '../../lib';

export const verifyOwnership = (item: Project | Bid) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (req.viewer) {
        if (item.userId !== req.viewer.id) {
          res
            .status(403)
            .json({
              message:
                'Unauthorized! You do not have ownership of this ressource.'
            });
        }
        next();
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            "We've encounted an error while verifying user ownership. Please try again later!"
        });
    }
  };
};
