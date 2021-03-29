import { NextFunction, Request, Response } from 'express';
import { Users } from '@prisma/client';

import prisma from '../../data';
import ApiError from '../error';
import { ManyUsers } from '../../lib/types/express';

class UserController {
  /**
   * @desc    Get All Users
   * @route   GET /api/users
   * @access  Private
   */
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: ManyUsers[] = await prisma.users.findMany({
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          address: true,
          city: true,
          state: true,
          country: true,
          type: true
        }
      });

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
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const user = await prisma.users.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          address: true,
          city: true,
          state: true,
          country: true,
          type: true,
          income: req.auth0User.sub === id ? true : false,
          walletId: req.auth0User.sub === id ? true : false
        }
      });

      if (!user) {
        next(ApiError.notFound('User not found.'));
        return;
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
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const user: Users | null = await prisma.users.findUnique({
        where: { id }
      });

      if (!user) {
        next(ApiError.notFound('User not found.'));
        return;
      } else {
        const updateUser = await prisma.users.update({
          where: { id: user.id },
          data: { ...req.body }
        });

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
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;
      const user = await prisma.users.findUnique({ where: { id } });

      if (!user) {
        next(ApiError.notFound('User not found.'));
        return;
      } else {
        await prisma.users.delete({ where: { id } });

        res.status(204).end();
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
