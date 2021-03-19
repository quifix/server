import express, { Request, Response } from 'express';
import { Bids, PrismaClient, Projects } from '@prisma/client';
import {
  bidValidation,
  idParamValidation,
  verifyOwnership,
  verifyUserType
} from '../../middlewares';

export const router = express.Router();
const prisma: PrismaClient = new PrismaClient();

/**
 * @desc      Create a bid on a project
 * @route     POST /api/bids/
 * @access    Private
 */
router.post(
  '/',
  bidValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        if (verifyUserType(req.viewer) === true) {
          const project: Projects | null = await prisma.projects.findUnique({
            where: { id: req.body.projectId }
          });

          if (project) {
            if ((await verifyOwnership(project, req.viewer)) === true) {
              res.status(400).json({
                message: 'Bad request. Bid on personal project not allowed'
              });
            } else {
              const bid: Bids = await prisma.bids.create({ data: req.body });

              if (bid) {
                res.status(200).json(bid);
              }
            }
          } else {
            res.status(404).json({ message: 'project not found.' });
          }
        } else {
          res.status(403).json({
            message: 'User type not allowed to bid on project.'
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while adding your bid to the project. Please try again later!"
      });
    }
  }
);

/**
 * @desc     Get all the bids
 * @route    GET /api/bids
 * @access   Private
 */
router.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const bids: Bids[] = await prisma.bids.findMany();

      if (bids) {
        res.status(200).json(bids);
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while looking for the bids. Please try again later!"
      });
    }
  }
);

/**
 * @desc      Get a single bid by id
 * @route     GET /api/bids/:id
 * @access    Private
 */
router.get(
  '/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        const id: string = req.params.id;
        const bid: Bids | null = await prisma.bids.findUnique({
          where: { id }
        });

        if (!bid) {
          res.status(404).json({ message: 'Bid not found' });
        }

        res.status(200).json(bid);
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while looking for your bid. Please try again later!"
      });
    }
  }
);

/**
 * @desc      Update an exisiting bid by the owner of the bid.
 * @route     PUT /api/bids/:id
 * @access    Private
 */
router.put(
  '/:id',
  idParamValidation,
  bidValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        const id: string = req.params.id;
        const bid: Bids | null = await prisma.bids.findUnique({
          where: { id }
        });

        if (!bid) {
          res.status(404).json({ message: 'Bid not found.' });
        }

        if (bid && (await verifyOwnership(bid, req.viewer)) === true) {
          const result: Bids = await prisma.bids.update({
            where: { id: bid.id },
            data: { ...req.body }
          });

          res.status(201).json(result);
        }
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while trying to update your bid. Please try again later!"
      });
    }
  }
);

/**
 * @desc      Delete an existing bid by the owner of the bid.
 * @route     DELETE /api/bids/:id
 * @access    Private
 */
router.delete(
  '/:id',
  idParamValidation,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.viewer) {
        const id: string = req.params.id;
        const bid: Bids | null = await prisma.bids.findUnique({
          where: { id }
        });

        if (!bid) {
          res.status(404).json({ message: 'Bid not found' });
        }

        if (bid && (await verifyOwnership(bid, req.viewer)) === true) {
          await prisma.bids.delete({ where: { id: bid.id } });
          res.status(204).end();
        } else {
          res
            .status(403)
            .json({ message: 'Access denied! You do not own this bid.' });
        }
      }
    } catch (error) {
      res.status(500).json({
        message:
          "We've encounted an error while trying to delete your bid. Please try again later!"
      });
    }
  }
);
