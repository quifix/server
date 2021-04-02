import { NextFunction, Request, Response } from 'express';
import { Bids, Projects, Users } from '@prisma/client';

import { bidService, projectService, userService } from '../service';
import ApiError from './error';

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
      const user: Users | null = await userService.findUserByID(req.userID);

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        if ((await userService.verifyUserType(user)) === true) {
          const project: Projects | null = await projectService.findProjectByID(
            req.body.projectId
          );

          if (project) {
            if (
              (await userService.verifyOwnership(project, req.userID)) === true
            ) {
              next(
                ApiError.badRequest(
                  'Bad request. Bid on personal project not allowed'
                )
              );
              return;
            } else {
              const bid: Bids = await bidService.createBid(req.body);

              res.status(201).json(bid);
            }
          } else {
            return next(ApiError.notFound('Project not found.'));
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
      return next(
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
      const bids: Bids[] = await bidService.findBids();
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
      const bid: Bids | null = await bidService.findBidByID(id);

      if (!bid) {
        return next(ApiError.notFound('Bid not found.'));
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
      const bid: Bids | null = await bidService.findBidByID(id);

      if (!bid) {
        return next(ApiError.notFound('Bid not found.'));
      } else {
        if ((await userService.verifyOwnership(bid, req.userID)) === true) {
          const updatedBid: Bids = await bidService.editBid(bid.id, req.body);

          res.status(200).json(updatedBid);
        } else {
          return next(
            ApiError.invalidCredentials(
              'Access denied! You do not own this bid.'
            )
          );
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
      const bid: Bids | null = await bidService.findBidByID(id);

      if (!bid) {
        next(ApiError.notFound('Bid not found.'));
        return;
      } else {
        if ((await userService.verifyOwnership(bid, req.userID)) === true) {
          await bidService.deleteBid(bid.id);

          res.status(204).end();
        } else {
          return next(
            ApiError.invalidCredentials(
              'Access denied! You do not own this bid.'
            )
          );
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
