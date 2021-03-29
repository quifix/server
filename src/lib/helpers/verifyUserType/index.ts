import { Users } from '@prisma/client';
import { UserType } from '../../types';

export const verifyUserType = (user: Users): boolean => {
  if (user.type === UserType.Contractor || user.type === UserType.Handyman) {
    return true;
  } else {
    return false;
  }
};
