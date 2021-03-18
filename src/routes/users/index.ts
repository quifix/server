import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc    Get All Users
 * @route   GET /api/users
 * @access  Private
 */
router.get(
  '/',
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          address: true,
          city: true,
          state: true,
          country: true,
          type: true,
          income: true
        }
      });

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({
        message:
          "We've encounted an error while retrieving the users. Please try again later"
      });
    }
  }
);
