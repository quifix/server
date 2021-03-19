import { Bids, Projects, Users } from '.prisma/client';

export const verifyOwnership = async (
  item: Projects | Bids,
  user: Users
): Promise<boolean | void> => {
  if (item.userId !== user.id) {
    return false;
  }
  return true;
};
