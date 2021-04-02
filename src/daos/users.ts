import { Users } from '@prisma/client';

import { prisma } from '../db';
import { UsersResponse } from '../@types/express';

class UserDao {
  // Find All Users
  async findAll(): Promise<UsersResponse[]> {
    try {
      const users: UsersResponse[] = await prisma.users.findMany({
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          address: true,
          city: true,
          state: true,
          country: true,
          type: true
        }
      });

      return users;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Find User By ID
  async findById(id: string, viewerID?: string): Promise<Users | null> {
    try {
      const user: Users | null = await prisma.users.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
          address: true,
          city: true,
          state: true,
          country: true,
          type: true,
          income: viewerID === id ? true : false,
          walletId: viewerID === id ? true : false
        }
      });

      return user ? user : Promise.reject('User not found.');
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Edit User
  async edit(id: string, data: Users): Promise<Users> {
    try {
      const user: Users = await prisma.users.update({ where: { id }, data });

      return user;
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }

  // Delete User
  async destroy(id: string): Promise<boolean> {
    try {
      const user: Users | null = await this.findById(id);

      if (user) {
        await prisma.users.delete({ where: { id } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }
}

export default new UserDao();
