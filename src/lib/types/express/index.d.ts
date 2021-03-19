import { Users } from '@prisma/client';
export interface RegisterArgs {
  name: string;
  email: string;
}

export interface UserUpdateArgs {
  name?: string;
  email?: string;
  avatar?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  type?: string;
  walletId?: string;
  income?: number;
}

declare global {
  namespace Express {
    export interface Request {
      viewer?: Users | null;
      registerArgs?: RegisterArgs;
      userID?: string | null;
      updateUserArgs?: UserUpdateArgs;
    }
  }
}
