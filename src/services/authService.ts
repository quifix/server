import { Users } from '@prisma/client';

import { AuthDao } from '../daos';
import { UserData } from '../@types/express';

const register = async (data: UserData): Promise<Users> => {
  try {
    const user = await AuthDao.createUser(
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

const login = async (id: string): Promise<Users | null> => {
  try {
    const user = await AuthDao.getUser(id);
    return user;
  } catch (error) {
    return Promise.reject('user not found.');
  }
};

export default { login, register };
