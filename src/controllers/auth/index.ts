import { NextFunction, Request, Response } from 'express';
import { PrismaClient, Users, UserTypes } from '@prisma/client';
import axios from 'axios';
import ApiError from '../error';

const prisma: PrismaClient = new PrismaClient();

class AuthController {
  // AUTHENTICATE
  async auth(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.slice(7);

    if (token) {
      res.cookie('_token', token, {
        httpOnly: true,
        sameSite: true,
        secure: true
      });

      axios.defaults.headers['content-type'] = 'application/json';
      axios.defaults.headers['authorization'] = `Bearer ${token}`;

      const { data } = await axios.get(
        `${process.env.ISSUER_BASE_URL}/userinfo`
      );

      data.sub = data.sub.slice(6);

      const user: Users | null = await prisma.users.findUnique({
        where: { id: data.sub }
      });

      if (user) {
        res.status(200).json(user);
      } else {
        const { sub: id, nickname: name, email, picture: avatar } = data;

        const type = UserTypes.CUSTOMER;

        const result: Users = await prisma.users.create({
          data: {
            id,
            name,
            email,
            avatar,
            type
          }
        });

        res.status(201).json(result);
      }
    } else {
      next(
        ApiError.invalidCredentials('Forbidden access, invalid credentials')
      );
      return;
    }
  }

  // LOGOUT
  async logout(req: Request, res: Response): Promise<void> {
    const cookieOptions = { httpOnly: true, sameSite: true, secure: true };

    req.userID = null;
    req.auth0User = {};
    res.clearCookie('_token', cookieOptions);
    res.clearCookie('_csrf');
    res.status(204).end();
  }

  //  CSRF
  async getCsrf(req: Request, res: Response): Promise<void> {
    res.status(200).json({ csrfToken: req.csrfToken() });
  }
}

export default new AuthController();
