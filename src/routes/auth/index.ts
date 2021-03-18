import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc    Register or log users.
 * @route   POST /api/authenticate
 * @access  Public
 */
router.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        res.status(200).json(req.viewer);
      }

      const newUser = await prisma.users.create(req.body);

      if (newUser) {
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to authenticate user. Please try again later!'
      });
    }
  }
);
