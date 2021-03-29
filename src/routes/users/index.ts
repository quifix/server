import express from 'express';

import { UserController } from '../../controllers';
import {
  asyncHandler,
  idParamValidation,
  userUpdateValidation,
  verifyUserId
} from '../../middleware';

export const router = express.Router();

/**
 * @desc    Get All Users
 * @route   GET /api/users
 * @access  Private
 */
router.get('/', asyncHandler(UserController.userGetAll));

/**
 * @desc    Get a single user by id
 * @route   GET /api/users/:id
 * @access  Private
 */
router.get('/:id', idParamValidation, asyncHandler(UserController.userGetById));

/**
 * @desc    Update a single user
 * @route   PUT /api/users/:id
 * @access  Private
 */
router.put(
  '/:id',
  idParamValidation,
  userUpdateValidation,
  verifyUserId,
  asyncHandler(UserController.userUpdate)
);

/**
 * @desc      delete a single user
 * @route     DELETE /api/users/:id
 * @access    Private
 */
router.delete(
  '/:id',
  idParamValidation,
  verifyUserId,
  asyncHandler(UserController.userDelete)
);
