import express from 'express';

import { AuthController } from '../../controllers';
import { asyncHandler } from '../../middleware';

export const router = express.Router();

/**
 * @desc    Get csrf token.
 * @route   GET /api/csrf-token
 * @access  Private
 */
router.get('/', asyncHandler(AuthController.csrfGet));
