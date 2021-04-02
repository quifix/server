import { NextFunction, Request, Response } from 'express';
import { Users } from '@prisma/client';
import statusCodes from 'http-status-codes';

import ApiError from './Error';
import { UsersResponse } from '../@types/express';
import { userService } from '../entities';

const { NO_CONTENT, OK } = statusCodes;

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
      const users: UsersResponse[] = await userService.findUsers();

      res.status(OK).json(users);
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
      const user: Users | null = await userService.findUserByID(
        id,
        req.userID || ''
      );

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        res.status(OK).json(user);
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
        const file = req.file;

        if (!file) {
          const updatedUser: Users = await userService.editUser(
            user.id,
            req.body
          );

          res.status(OK).json(updatedUser);
        } else {
          req.body.avatar = file.path;

          const updatedUser: Users = await userService.editUser(
            user.id,
            req.body
          );

          res.status(OK).json(updatedUser);
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
      const user: Users | null = await userService.findUserByID(id);

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        if (user.id !== req.userID) {
          return next(
            ApiError.unauthorized(
              ' You are not authorized to perform this task!'
            )
          );
        } else {
          await userService.deleteUser(user.id);

          res.status(NO_CONTENT).end();
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
