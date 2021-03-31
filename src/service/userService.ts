import { Bids, Projects, Users, UserTypes } from '@prisma/client';

import { UserDao } from '../dao';
import { ManyUsers } from '../lib/types/express';

const findUsers = async (): Promise<ManyUsers[]> => {
  try {
    const users: ManyUsers[] = await UserDao.findAll();
    return users;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const findUserByID = async (
  id: string,
  viewerID?: string
): Promise<Users | null> => {
  try {
    const user: Users | null = await UserDao.findById(id, viewerID);

    return user ? user : Promise.reject('User not found.');
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const editUser = async (id: string, update: Users): Promise<Users> => {
  try {
    const user: Users = await UserDao.edit(id, update);

    return user;
  } catch (error) {
    return Promise.reject('Internal error.');
  }
};

const deleteUser = async (id: string): Promise<string> => {
  try {
    const done: boolean = await UserDao.destroy(id);

    return done ? 'Success!' : Promise.reject('User not found.');
  } catch (error) {
    return Promise.reject('Internal error.');
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

export default {
  deleteUser,
  editUser,
  findUserByID,
  findUsers,
  verifyOwnership,
  verifyUserType
};
