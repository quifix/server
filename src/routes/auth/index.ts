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
        where: { id: req.userID || '' }
      });

      if (!user) {
        const newUser: Users = {
          id: req.userID || '',
          name: req.body.nickname || '',
          email: req.body.email,
          avatar: req.body.avatar,
          type: req.body.type ? req.body.type : UserTypes.CUSTOMER
        };

        const data: Users = await prisma.users.create({ data: newUser });

        if (data) {
          res.status(201).json(data);
        }
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to authenticate user. Please try again later!'
      });
    }
  }
);
