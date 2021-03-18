export interface IDToken {
  iss?: string;
  sub: string;
  aud?: [string];
  azp?: string;
  exp: number;
  iat: number;
  scope?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  type: UserType;
  walletId?: string;
  income: number;
}

export enum UserType {
  Customer = 'CUSTOMER',
  Contractor = 'CONTRACTOR',
  Handyman = 'HANDYMAN'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  isOpen: boolean;
  userId: string;
  address: string;
  country: string;
  state: string;
  city: string;
}

export enum ProjectType {
  Painting = 'PAINTING',
  Contruction = 'CONSTRUCTION',
  Electric = 'ELECTRIC',
  Renovation = 'RENOVATION',
  Outdoor_project = 'OUTDOOR_PROJECT',
  Other = 'OTHER'
}

export interface Bid {
  id: string;
  price: number;
  projectId: string;
  userId: string;
  accepted: boolean;
}
