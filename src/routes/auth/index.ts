import express, { Request, Response } from 'express';
import { PrismaClient, Users } from '@prisma/client';
import jwtDecode from 'jwt-decode';
import { Auth0User, User, UserType } from '../../lib';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc    Register or log users.
 * @route   POST /api/authenticate
 * @access  Public
 */
router.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.oidc.isAuthenticated() === true) {
        if (req.oidc.idToken) {
          const token = await req.oidc.idToken;

          res.cookie('qToken', token, {
            httpOnly: true,
            sameSite: true,
            secure: true
          });

          const decodedToken: Auth0User = await jwtDecode(token);

          if (decodedToken) {
            req.user = decodedToken;

            const user: Users | null = await prisma.users.findUnique({
              where: { id: decodedToken.sub.slice(6) }
            });

            if (!user) {
              const newUser: User = {
                id: decodedToken.sub.slice(6),
                name: decodedToken.nickname || '',
                email: decodedToken.email || '',
                avatar: decodedToken.picture || '',
                type: UserType.Customer
              };

              const data: Users = await prisma.users.create({ data: newUser });

              if (data) {
                req.viewer = data;
                res.status(201).json(data);
              }
            } else {
              res.status(200).json(user);
            }
          }
        }
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to authenticate user. Please try again later!'
      });
    }
  }
);
