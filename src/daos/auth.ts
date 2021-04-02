import { Users, UserTypes } from '@prisma/client';

import { prisma } from '../db';

class AuthDao {
  // Create User
  async createUser(
    id: string,
    name: string,
    email: string,
    avatar: string
  ): Promise<Users> {
    try {
      const type = UserTypes.CUSTOMER;
      const user: Users = await prisma.users.create({
        data: { id, name, email, avatar, type }
      });

      return user;
    } catch (error) {
      return Promise.reject('Internal error');
    }
  }

  async getUser(id: string): Promise<Users | null> {
    try {
      const user: Users | null = await prisma.users.findUnique({
        where: { id }
      });

      return user ? user : Promise.reject('User not found.');
    } catch (error) {
      return Promise.reject('Internal error.');
    }
  }
}

export default new AuthDao();
