import express, { Request, Response } from 'express';
import { PrismaClient, Users } from '@prisma/client';
import { registerValidation } from '../../middlewares';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc    Register or log users.
 * @route   POST /api/authenticate
 * @access  Public
 */
router.post(
  '/',
  registerValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        res.status(200).json(req.viewer);
      }

      if (req.registerArgs && req.userID) {
        const user: Users = await prisma.users.create({
          data: { ...req.body, id: req.userID }
        });

        if (user) {
          req.viewer = user;
          res.status(200).json(user);
        }
      }
    } catch (error) {
      res.status(500).json({
        message: 'Failed to authenticate user. Please try again later!'
      });
    }
  }
);
