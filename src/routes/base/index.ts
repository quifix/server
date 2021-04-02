import { Request, Response, Router } from 'express';
import statusCodes from 'http-status-codes';

export const router = Router();

const { OK } = statusCodes;

router.get(
  '/',
  async (_req: Request, res: Response): Promise<void> => {
    res.status(OK).json({ message: 'Hello World!' });
  }
);
