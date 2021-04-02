import { NextFunction, Request, Response } from 'express';
import { Users } from '@prisma/client';
import axios from 'axios';
import statusCodes from 'http-status-codes';

import { authService } from '../entities';
import ApiError from './Error';
import { UserData } from '../@types/express';

const { CREATED, NO_CONTENT, OK } = statusCodes;

class AuthController {
  /**
   * @desc    Register or log users coming from Auth0.
   * @route   POST /api/authenticate
   * @access  Public
   */
  async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.slice(7);

      if (token) {
        res.cookie('_token', token, {
          httpOnly: true,
          sameSite: true,
          secure: process.env.NODE_ENV === 'development' ? true : false
        });

        axios.defaults.headers['content-type'] = 'application/json';
        axios.defaults.headers['authorization'] = `Bearer ${token}`;

        const { data }: { data: UserData } = await axios.get(
          `${process.env.ISSUER_BASE_URL}/userinfo`
        );

        data.sub = data.sub.slice(6);

        const user: Users | null = await authService.login(data.sub);

        if (user) {
          res.status(OK).json(user);
        } else {
          const user: Users = await authService.register(data);

          res.status(CREATED).json(user);
        }
      } else {
        return next(
          ApiError.forbidden('Forbidden access, invalid credentials')
        );
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc   Logout user
   * @route   POST /api/logout
   * @access  Private
   */
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cookieOptions = {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV === 'development' ? true : false
      };

      res.clearCookie('_token', cookieOptions);
      req.userID = null;
      res.clearCookie('_csrf');

      res.status(NO_CONTENT).end();
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc    Get csrf token.
   * @route   GET /api/csrf-token
   * @access  Private
   */
  async csrfGet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(OK).json({ csrfToken: req.csrfToken() });
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }
}

export default new AuthController();
