import { UserTypes } from '@prisma/client';

export interface Auth0User {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: string;
}

export interface IDToken {
  iss?: string;
  sub: string;
  aud?: [string];
  azp?: string;
  exp: number;
  iat: number;
  scope?: string;
}

export interface UserData {
  sub: string;
  nickname: string;
  email: string;
  picture: string;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
  type: UserTypes;
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

export interface UsersResponse {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  type: string | null;
}

declare global {
  namespace Express {
    export interface Request {
      userID: string | null;
    }
  }
}
