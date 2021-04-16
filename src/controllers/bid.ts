import { NextFunction, Request, Response } from 'express';
import { Bids, Projects, Users } from '@prisma/client';
import statusCodes from 'http-status-codes';

import { bidService, projectService, userService } from '../services';
import ApiError from './Error';

const { CREATED, NO_CONTENT, OK } = statusCodes;

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
      const user: Users | null = await userService.findUserByID(
        req.userID || ''
      );

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      } else {
        if ((await userService.verifyUserType(user)) === true) {
          const project: Projects | null = await projectService.findProjectByID(
            req.body.projectId
          );

          if (project) {
            if (
              (await userService.verifyOwnership(project, req.userID || '')) ===
              true
            ) {
              return next(
                ApiError.badRequest(
                  'Bad request. Bid on personal project not allowed'
                )
              );
            } else {
              const bid: Bids = await bidService.createBid(req.body);

              res.status(CREATED).json(bid);
            }
          } else {
            return next(ApiError.notFound('Project not found.'));
          }
        } else {
          return next(
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
      res.status(OK).json(bids);
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
        res.status(OK).json(bid);
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
        if (
          (await userService.verifyOwnership(bid, req.userID || '')) === true
        ) {
          const updatedBid: Bids = await bidService.editBid(bid.id, req.body);

          res.status(OK).json(updatedBid);
        } else {
          return next(
            ApiError.forbidden('Access denied! You do not own this bid.')
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
        return next(ApiError.notFound('Bid not found.'));
      } else {
        if (
          (await userService.verifyOwnership(bid, req.userID || '')) === true
        ) {
          await bidService.deleteBid(bid.id);

          res.status(NO_CONTENT).end();
        } else {
          return next(
            ApiError.forbidden('Access denied! You do not own this bid.')
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
