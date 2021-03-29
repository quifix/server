import { NextFunction, Request, Response } from 'express';
import { Bids, Projects, Users } from '@prisma/client';

import prisma from '../../data';
import { verifyOwnership, verifyUserType } from '../../lib';
import ApiError from '../error';

class BidController {
  /**
   * @desc      Create a bid on a project
   * @route     POST /api/bids/
   * @access    Private
   */
  async bidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: Users | null = await prisma.users.findUnique({
        where: { id: req.auth0User.sub }
      });

      if (!user) {
        next(ApiError.notFound('User not found.'));
        return;
      } else {
        if (verifyUserType(user) === true) {
          const project: Projects | null = await prisma.projects.findUnique({
            where: { id: req.body.projectId }
          });

          if (project) {
            if ((await verifyOwnership(project, req.auth0User.sub)) === true) {
              next(
                ApiError.badRequest(
                  'Bad request. Bid on personal project not allowed'
                )
              );
              return;
            } else {
              const bid: Bids = await prisma.bids.create({ data: req.body });

              res.status(201).json(bid);
            }
          }
        } else {
          next(
            ApiError.badRequest(
              'Bad request. This project is only open to contractors and handymen!'
            )
          );
        }
      }
    } catch (error) {
      next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc     Get all the bids
   * @route    GET /api/bids
   * @access   Private
   */
  async bidGetAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bids: Bids[] = await prisma.bids.findMany();
      res.status(200).json(bids);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an internal error. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc      Get a single bid by id
   * @route     GET /api/bids/:id
   * @access    Private
   */
  async bidGetById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const bid: Bids | null = await prisma.bids.findUnique({ where: { id } });

      if (!bid) {
        next(ApiError.notFound('Bid not found.'));
        return;
      } else {
        res.status(200).json(bid);
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
   * @desc      Update an exisiting bid by the owner of the bid.
   * @route     PUT /api/bids/:id
   * @access    Private
   */
  async bidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const bid: Bids | null = await prisma.bids.findUnique({ where: { id } });

      if (!bid) {
        next(ApiError.notFound('Bid not found.'));
        return;
      } else {
        if ((await verifyOwnership(bid, req.auth0User.sub)) === true) {
          const updatedBid: Bids = await prisma.bids.update({
            where: { id: bid.id },
            data: { ...req.body }
          });

          res.status(200).json(updatedBid);
        } else {
          next(
            ApiError.invalidCredentials(
              'Access denied! You do not own this bid.'
            )
          );
          return;
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
   * @desc      Delete an existing bid by the owner of the bid.
   * @route     DELETE /api/bids/:id
   * @access    Private
   */
  async bidDelete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.params.id;
      const bid: Bids | null = await prisma.bids.findUnique({ where: { id } });

      if (!bid) {
        next(ApiError.notFound('Bid not found.'));
        return;
      } else {
        if ((await verifyOwnership(bid, req.auth0User.sub)) === true) {
          await prisma.bids.delete({ where: { id: bid.id } });

          res.status(204).end();
        } else {
          next(
            ApiError.invalidCredentials(
              'Access denied! You do not own this bid.'
            )
          );
          return;
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

export default new BidController();
