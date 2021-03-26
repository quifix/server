import { NextFunction, Request, Response } from 'express';
import jwtDecode from 'jwt-decode';
import { IDToken } from '../../lib/types';

export const attachUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token = '';

    if (req.headers.authorization) {
      token = req.headers.authorization.slice(7);

      res.cookie('_token', token, {
        httpOnly: true,
        sameSite: true,
        secure: true
      });
    }

    if (req.cookies._token) {
      token = req.cookies._token;
    }

    if (token) {
      const decodedToken: IDToken = await jwtDecode(token);

      req.userID = decodedToken.sub.slice(6);
      next();
    } else {
      res
        .status(403)
        .json({ message: 'Forbidden access, invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "We've encounted an error retrieving the user info. Please try again later!"
    });
  }
};
