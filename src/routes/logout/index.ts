import express from 'express';

import { AuthController } from '../../controllers';
import { asyncHandler } from '../../middleware';

export const router = express.Router();

/**
 * @desc   Logout user
 * @route   POST /api/logout
 * @access  Private
 */
router.post('/', asyncHandler(AuthController.logout));
