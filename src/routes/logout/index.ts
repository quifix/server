import express, { Request, Response } from 'express';
import { attachUser } from '../../middlewares';

export const router = express.Router();

const cookieOptions = { httpOnly: true, sameSite: true, secure: true };

/**
 * @desc    Logout users.
 * @route   /api/logout
 * @access  Private
 */
router.get(
  '/',
  attachUser,
  async (req: Request, res: Response): Promise<void> => {
    try {
      req.userID = null;
      req.viewer = null;
      res.clearCookie('userToken', cookieOptions);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while logout. Please try again later!"
      });
    }
  }
);
