import { Users } from '@prisma/client';
export interface RegisterArgs {
  name: string;
  email: string;
}

declare global {
  namespace Express {
    export interface Request {
      viewer?: Users | null;
      registerArgs?: RegisterArgs;
      userID?: string | null;
    }
  }
}
