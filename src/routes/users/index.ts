import express from 'express';

import { UserController } from '../../controllers';
import {
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
router.get('/', UserController.getAllUsers);

/**
 * @desc    Get a single user by id
 * @route   GET /api/users/:id
 * @access  Private
 */
router.get('/:id', idParamValidation, UserController.getUser);

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
  UserController.updateUser
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
  UserController.deleteUser
);
