import { NextFunction, Request, Response } from 'express';
import { Users } from '@prisma/client';

import ApiError from './error';
import { ManyUsers } from '../lib/types/express';
import { userService } from '../service';

class UserController {
  /**
   * @desc    Get All Users
   * @route   GET /api/users
   * @access  Private
   */
  async userGetAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: ManyUsers[] = await userService.findUsers();

      res.status(200).json(users);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc    Get a single user by id
   * @route   GET /api/users/:id
   * @access  Private
   */
  async userGetById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const user = await userService.findUserByID(id, req.userID || '');

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc    Update a single user
   * @route   PUT /api/users/:id
   * @access  Private
   */
  async userUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const user: Users | null = await userService.findUserByID(id);

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        const updateUser = await userService.editUser(user.id, req.body);

        res.status(200).json(updateUser);
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc      delete a single user
   * @route     DELETE /api/users/:id
   * @access    Private
   */
  async userDelete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const user = await userService.findUserByID(id);

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        if (user.id !== req.userID) {
          return next(
            ApiError.auth(' You are not authorized to perform this task!')
          );
        } else {
          await userService.deleteUser(user.id);

          res.status(204).end();
        }
      }
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }
}

export default new UserController();
