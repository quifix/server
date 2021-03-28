import { Request, Response } from 'express';

export const notFound = (_req: Request, res: Response): void => {
  const error = new Error();
  error.message = 'Not found';
  res.status(404).json(error);
};
