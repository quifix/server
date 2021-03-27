import express, { Request, Response } from 'express';
import { PrismaClient, Users, UserTypes } from '@prisma/client';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc    Register or log users coming from Auth0.
 * @route   POST /api/authenticate
 * @access  Public
 */
router.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user: Users | null = await prisma.users.findUnique({
        where: { id: req.auth0User.sub }
      });

      if (user) {
        res.status(200).json(user);
      } else {
        const {
          sub: id,
          nickname: name,
          email,
          picture: avatar
        } = req.auth0User;

        const type = UserTypes.CUSTOMER;

        const data: Users = await prisma.users.create({
          data: {
            id,
            name,
            email,
            avatar,
            type
          }
        });

        res.status(201).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Failed to authenticate user. Please try again later!'
      });
    }
  }
);
