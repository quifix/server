export type User = {
    id: string;
    name: string;
    avatar: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    type: UserType;
    income?: number;
}

export enum UserType {
    Customer = 'CUSTOMER',
    Contractor = 'CONTRACTOR',
    Handyman = 'HANDYMAN'
}

export type Project = {
    id: string;
    title: string;
    description: string;
    type: ProjectType;
    isOpen: boolean;
    userId: string;
    address: string;
    state: string;
    city: string;
    country: string;

}

export enum ProjectType {
    Painting = 'PAINTING',
    Construction = 'CONSTRUCTION',
    Electric = 'ELECTRIC',
    Renovation = 'RENOVATION',
    Outdoor_Project = 'OUTDOOR_PROJECT',
    Other = 'OTHER'
}


export type Bid = {
    id: string;
    price: number;
    projectId: string;
    userId: string;
    accepted: boolean;
}