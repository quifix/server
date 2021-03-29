import { Bids, Projects } from '@prisma/client';

export const verifyOwnership = async (
  item: Projects | Bids,
  userId: string
): Promise<boolean | void> => {
  if (!userId) return false;
  if (item.userId !== userId) {
    return false;
  }
  return true;
};
