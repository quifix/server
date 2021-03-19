import { NextFunction, Request, Response } from 'express';

export const verifyUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.viewer) {
      const id = req.params.id;
      if (id === req.viewer.id) {
        next();
      }
      res.status(403).json({ message: 'Unauthorized access!' });
    }
    res.status(403).json({ message: 'Viewer unavailable, access denied!' });
  } catch (error) {
    res.status(500).json({
      message:
        "We've encounted an error while verifying the user ID. Please try again later!"
    });
  }
};
