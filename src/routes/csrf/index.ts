import express from 'express';

import { AuthController } from '../../controllers';

export const router = express.Router();

/**
 * @desc    Get csrf token.
 * @route   GET /api/csrf-token
 * @access  Private
 */
router.get('/', AuthController.getCsrf);
