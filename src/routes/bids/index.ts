import express from 'express';

import { BidController } from '../../controllers';
import { bidValidation, idParamValidation } from '../../middleware';

export const router = express.Router();

/**
 * @desc      Create a bid on a project
 * @route     POST /api/bids/
 * @access    Private
 */
router.post('/', bidValidation, BidController.createBid);

/**
 * @desc     Get all the bids
 * @route    GET /api/bids
 * @access   Private
 */
router.get('/', BidController.getAllBids);

/**
 * @desc      Get a single bid by id
 * @route     GET /api/bids/:id
 * @access    Private
 */
router.get('/:id', idParamValidation, BidController.getBid);

/**
 * @desc      Update an exisiting bid by the owner of the bid.
 * @route     PUT /api/bids/:id
 * @access    Private
 */
router.put('/:id', idParamValidation, bidValidation, BidController.updateBid);

/**
 * @desc      Delete an existing bid by the owner of the bid.
 * @route     DELETE /api/bids/:id
 * @access    Private
 */
router.delete('/:id', idParamValidation, BidController.deleteBid);
