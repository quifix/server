import { Bids } from '@prisma/client';

import { prisma } from '../db';

class BidDAO {
  // Create Bid
  async create(data: Bids): Promise<Bids> {
    try {
      const bid: Bids = await prisma.bids.create({ data });

      return bid;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Find All Bids
  async findAll(): Promise<Bids[]> {
    try {
      const bids: Bids[] = await prisma.bids.findMany();

      return bids;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Find Bid By ID
  async findByID(id: string): Promise<Bids | null> {
    try {
      const bid: Bids | null = await prisma.bids.findUnique({ where: { id } });

      return bid ? bid : Promise.reject('Bid not found.');
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Edid Bid
  async edit(id: string, data: Bids): Promise<Bids> {
    try {
      const bid: Bids = await prisma.bids.update({ where: { id }, data });

      return bid;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Delete Bid
  async destroy(id: string): Promise<boolean> {
    try {
      const bid: Bids | null = await this.findByID(id);

      if (bid) {
        await prisma.bids.delete({ where: { id: bid.id } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }
}

export default new BidDAO();
