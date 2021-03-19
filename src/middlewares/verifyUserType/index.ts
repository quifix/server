import { Users } from '.prisma/client';

export const verifyUserType = (user: Users): boolean => {
  if (user.type === 'CONTRACTOR' || user.type === 'HANDYMAN') {
    return true;
  } else {
    return false;
  }
};
