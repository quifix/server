import express from 'express';

import { AuthController } from '../../controllers';

export const router = express.Router();

/**
 * @desc    Register or log users coming from Auth0.
 * @route   POST /api/authenticate
 * @access  Public
 */
router.post('/', AuthController.auth);
