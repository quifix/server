import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

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
      axios.defaults.headers['content-type'] = 'application/json';
      axios.defaults.headers['authorization'] = `Bearer ${token}`;

      const { data } = await axios.get(
        `${process.env.ISSUER_BASE_URL}/userinfo`
      );

      data.sub = data.sub.slice(6);
      req.auth0User = data;
      req.userID = req.auth0User.sub;

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
