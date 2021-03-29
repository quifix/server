import express from 'express';

import { BidController } from '../../controllers';
import {
  asyncHandler,
  bidValidation,
  idParamValidation
} from '../../middleware';

export const router = express.Router();

/**
 * @desc      Create a bid on a project
 * @route     POST /api/bids/
 * @access    Private
 */
router.post('/', bidValidation, asyncHandler(BidController.bidCreate));

/**
 * @desc     Get all the bids
 * @route    GET /api/bids
 * @access   Private
 */
router.get('/', asyncHandler(BidController.bidGetAll));

/**
 * @desc      Get a single bid by id
 * @route     GET /api/bids/:id
 * @access    Private
 */
router.get('/:id', idParamValidation, asyncHandler(BidController.bidGetById));

/**
 * @desc      Update an exisiting bid by the owner of the bid.
 * @route     PUT /api/bids/:id
 * @access    Private
 */
router.put(
  '/:id',
  idParamValidation,
  bidValidation,
  asyncHandler(BidController.bidUpdate)
);

/**
 * @desc      Delete an existing bid by the owner of the bid.
 * @route     DELETE /api/bids/:id
 * @access    Private
 */
router.delete('/:id', idParamValidation, asyncHandler(BidController.bidDelete));
