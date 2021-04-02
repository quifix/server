import { Request, Response } from 'express';
import statusCodes from 'http-status-codes';

const { NOT_FOUND } = statusCodes;

export const notFound = (_req: Request, res: Response): void => {
  const error = new Error();
  error.message = 'Not found';
  res.status(NOT_FOUND).send(error.message);
};
