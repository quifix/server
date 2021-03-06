import { NextFunction, Request, Response } from 'express';
import jwtDecode from 'jwt-decode';

import { ApiError } from '../controllers';
import { IDToken } from '../@types/express';

export const attachUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies._token;

  if (token) {
    const decoded: IDToken = jwtDecode(token);
    req.userID = decoded.sub.slice(6);
    next();
  } else {
    return next(ApiError.forbidden('Forbidden access, invalid credentials'));
  }
};
