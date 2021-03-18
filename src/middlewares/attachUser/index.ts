import { NextFunction, Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { PrismaClient, Users } from '@prisma/client';
import { IDToken } from '../../lib/types';

const prisma = new PrismaClient();

export const attachUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization?.length > 0
    ) {
      const token = req.headers.authorization.slice(7);

      if (token) {
        const decodedToken: IDToken = await jwtDecode(token);

        if (decodedToken) {
          const user: Users | null = await prisma.users.findUnique({
            where: { id: decodedToken.sub.slice(6) }
          });

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          req.viewer = user!;

          res.cookie('userToken', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
          });

          next();
        } else {
          res.status(403).json({ message: 'Invalid token' });
        }
      } else {
        res
          .status(403)
          .json({ message: 'Forbidden access, invalid credentials' });
      }
    }
  } catch (err) {
    res.status(500).json({
      message:
        "We've encounted an error retrieving the user info. Please try again later!"
    });
  }
};
