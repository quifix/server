import { Bids, Projects, Users, UserTypes } from '@prisma/client';

import { UserDao } from '../dao';
import { UserData } from '../lib/types/express';

const register = async (data: UserData): Promise<Users> => {
  try {
    const user = await UserDao.createUser(
      data.sub,
      data.nickname,
      data.email,
      data.picture
    );

    return user;
  } catch (error) {
    return Promise.reject('Internal error');
  }
};

const findUnique = async (id: string): Promise<Users | null> => {
  try {
    const user = await UserDao.fidUserById(id);
    return user;
  } catch (error) {
    return Promise.reject('user not found.');
  }
};

const verifyOwnership = async (
  item: Projects | Bids,
  userId: string
): Promise<boolean> => {
  if (!userId) return false;
  if (item.userId !== userId) {
    return false;
  }
  return true;
};

const verifyUserType = async (user: Users): Promise<boolean> => {
  if (user.type === UserTypes.CONTRACTOR || user.type === UserTypes.HANDYMAN) {
    return true;
  } else {
    return false;
  }
};

export default { findUnique, register, verifyOwnership, verifyUserType };
