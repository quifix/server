import { NextFunction, Request, Response } from 'express';
import { Bids, Projects, Users } from '@prisma/client';

import prisma from '../../data';
import { verifyOwnership, verifyUserType } from '../../middleware';
import ApiError from '../error';

class BidController {
  /**
   * @desc      Create a bid on a project
   * @route     POST /api/bids/
   * @access    Private
   */
  async createBid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user: Users | null = await prisma.users.findUnique({
      where: { id: req.userID || '' }
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
      }
    }
  }

  /**
   * @desc     Get all the bids
   * @route    GET /api/bids
   * @access   Private
   */
  async getAllBids(req: Request, res: Response): Promise<void> {
    const bids: Bids[] = await prisma.bids.findMany();
    res.status(200).json(bids);
  }

  /**
   * @desc      Get a single bid by id
   * @route     GET /api/bids/:id
   * @access    Private
   */
  async getBid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    const bid: Bids | null = await prisma.bids.findUnique({ where: { id } });

    if (!bid) {
      next(ApiError.notFound('Bid not found.'));
      return;
    } else {
      res.status(200).json(bid);
    }
  }
  /**
   * @desc      Update an exisiting bid by the owner of the bid.
   * @route     PUT /api/bids/:id
   * @access    Private
   */
  async updateBid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
          ApiError.invalidCredentials('Access denied! You do not own this bid.')
        );
        return;
      }
    }
  }

  /**
   * @desc      Delete an existing bid by the owner of the bid.
   * @route     DELETE /api/bids/:id
   * @access    Private
   */
  async deleteBid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
          ApiError.invalidCredentials('Access denied! You do not own this bid.')
        );
        return;
      }
    }
  }
}

export default new BidController();
