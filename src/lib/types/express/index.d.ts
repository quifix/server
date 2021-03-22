import { RequestContext } from 'express-openid-connect';

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

export interface ProjectArgs {
  title?: string;
  description?: string;
  type?: string;
  isOpen?: boolean;
  userId?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
}

export interface BidArgs {
  price?: number;
  userId?: string;
  projectId?: string;
  accepted?: boolean;
}

declare global {
  namespace Express {
    export interface Request {
      oidc: RequestContext;
      userID?: string | null;
      updateUserArgs?: UserUpdateArgs;
      projectArgs: ProjectArgs;
      bidArgs: BidArgs;
    }
  }
}
