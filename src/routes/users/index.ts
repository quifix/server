import { Router } from 'express';
import multer from 'multer';

import { UserController } from '../../controllers';
import {
  asyncHandler,
  idParamValidation,
  userUpdateValidation,
  verifyUserId
} from '../../middleware';

export const router = Router();

const upload = multer({ dest: 'src/upload/avatars' });

/**
 * @desc    Get All Users
 * @route   GET /api/users
 * @access  Private
 */
router.get('/', asyncHandler(UserController.userGetAll));

router.use(idParamValidation);

/**
 * @desc    Get a single user by id
 * @route   GET /api/users/:id
 * @access  Private
 */
router.get('/:id', asyncHandler(UserController.userGetById));

/**
 * @desc    Update a single user
 * @route   PUT /api/users/:id
 * @access  Private
 */
router.put(
  '/:id',
  userUpdateValidation,
  verifyUserId,
  upload.single('userAvatar'),
  asyncHandler(UserController.userUpdate)
);

/**
 * @desc      delete a single user
 * @route     DELETE /api/users/:id
 * @access    Private
 */
router.delete('/:id', verifyUserId, asyncHandler(UserController.userDelete));
