import { Bids } from '@prisma/client';

import { BidDao } from '../dao';

const createBid = async (data: Bids): Promise<Bids> => {
  try {
    const bid: Bids = await BidDao.create(data);
    return bid;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const findBids = async (): Promise<Bids[]> => {
  try {
    const bids: Bids[] = await BidDao.findAll();
    return bids;
  } catch (error) {
    return Promise.reject('Internal error');
  }
};

const findBidByID = async (id: string): Promise<Bids | null> => {
  try {
    const bid: Bids | null = await BidDao.findByID(id);

    return bid ? bid : Promise.reject('Bid not found.');
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const editBid = async (id: string, update: Bids): Promise<Bids> => {
  try {
    const bid: Bids = await BidDao.edit(id, update);

    return bid;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const deleteBid = async (id: string): Promise<string> => {
  try {
    const done: boolean = await BidDao.destroy(id);

    return done ? 'Success' : Promise.reject('Bid not found.');
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

export default {
  createBid,
  deleteBid,
  editBid,
  findBidByID,
  findBids
};
