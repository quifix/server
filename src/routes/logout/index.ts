import express from 'express';

import { AuthController } from '../../controllers';

export const router = express.Router();

/**
 * @desc   Logout user
 * @route   POST /api/logout
 * @access  Private
 */
router.post('/', AuthController.logout);
