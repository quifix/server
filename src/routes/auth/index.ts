import { Router } from 'express';

import { AuthController } from '../../controllers';
import { asyncHandler } from '../../middleware';

export const router = Router();

/**
 * @desc    Register or log users coming from Auth0.
 * @route   POST /api/authenticate
 * @access  Public
 */
router.post('/', asyncHandler(AuthController.auth));
