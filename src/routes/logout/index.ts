import { Router } from 'express';

import { AuthController } from '../../controllers';
import { asyncHandler } from '../../middleware';

export const router = Router();

/**
 * @desc   Logout user
 * @route   POST /api/logout
 * @access  Private
 */
router.post('/', asyncHandler(AuthController.logout));
