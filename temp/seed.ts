import { Bid, Project, ProjectType, User, UserType } from '../src/@types'

export const users: User[] = [
  {
    id: 'ce03acb0-2a79-4858-87cf-c9f8674537c1',
    name: 'James K. Herring',
    avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    email: 'jameskherring@jourrapide.com',
    address: '2638 Timber Ridge Road',
    city: 'Menlo Park',
    state: 'CA',
    country: 'United States',
    type: UserType.Customer,
    income: 0
  },
  {
    id: 'a9213473-614b-43d3-a286-5d250929c19e',
    name: 'Alice T. Chapman',
    avatar: 'https://randomuser.me/api/portraits/women/92.jpg',
    email: 'alicetchapman@jourrapide.com',
    address: '2691 Webster Street',
    city: 'Elizabeth',
    state: 'NJ',
    country: 'United States',
    type: UserType.Customer,
    income: 0
  },
  {
    id: '7a583aef-d391-41ac-b929-db959de5a77f',
    name: 'Marjorie J. Gonzalez',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'marjoriejgonzalez@armyspy.com',
    address: '2105 Wolf Pen Road',
    city: 'Oakland',
    state: 'CA',
    country: 'United States',
    type: UserType.Customer,
    income: 0
  },
  {
    id: 'bf7747a2-474b-417d-9e63-e7560a5ac020',
    name: 'Wayne S. Bradley',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    email: 'waynesbradley@rhyta.com',
    address: '4352 Coleman Avenue',
    city: 'San Diego',
    state: 'CA',
    country: 'United States',
    type: UserType.Contractor,
    income: 65585000
  },
  {
    id: 'b16b75fb-2fc8-40e5-b1dc-c694dcf0cb4b',
    name: 'Michael K. Fiorentino',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    email: 'michaelkfiorentino@rhyta.com',
    address: '4190 Byers Lane',
    city: 'Sacramento',
    state: 'CA',
    country: 'United States',
    type: UserType.Contractor,
    income: 300478982
  },
  {
    id: '22d95e99-e3e5-4c41-874d-34896cd2e009',
    name: 'Lucy J. Mott',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    email: 'lucyjmott@armyspy.com',
    address: '3491 Francis Mine',
    city: 'Sacramento',
    state: 'CA',
    country: 'United States',
    type: UserType.Customer,
    income: 0
  },
  {
    id: '98f83778-7435-4c8c-a02f-0856a5681bea',
    name: 'Natasha Jankowski',
    avatar: 'https://randomuser.me/api/portraits/women/83.jpg',
    email: 'natashajankowski@armyspy.com',
    address: '3212 Parkview Drive',
    city: 'Los Angeles',
    state: 'CA',
    country: 'United States',
    type: UserType.Customer,
    income: 0
  },
  {
    id: 'd0119cf0-cf1c-4ad0-894b-7c411c568831',
    name: 'Stephen Fernandez',
    avatar: 'https://randomuser.me/api/portraits/men/87.jpg',
    email: 'stephendfernandez@jourrapide.com',
    address: '4818 Sunny Day Drive',
    city: 'Irvine',
    state: 'CA',
    country: 'United States',
    type: UserType.Handyman,
    income: 56789000
  },
  {
    id: 'd9d0edf9-36d6-42f4-a7fb-a8201324478c',
    name: 'Joseph Rosado',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    email: 'josephrosado@jourrapide.com',
    address: '2042 Richards Avenue',
    city: 'Stockton',
    state: 'CA',
    country: 'United States',
    type: UserType.Contractor,
    income: 245237000
  },
  {
    id: '5df2c1b5-daf7-49ef-93ba-0660001a5db7',
    name: 'Mark Dorman',
    avatar: 'https://randomuser.me/api/portraits/men/94.jpg',
    email: 'markdorman@rhyta.com',
    address: '2830 Half and Half Drive',
    city: 'Corcoran',
    state: 'CA',
    country: 'United States',
    type: UserType.Customer,
    income: 0
  }
];

export const projects: Project[] = [
  {
    id: 'b24b0d11-4f2b-4672-b465-56ce15e84a99',
    title: 'Painting, drywall, patio, and more (Menlo Park)',
    description:
      'Looking to get the following jobs done. A reasonable handyman that can do it all over a period of time would be great. Painting (ASAP, ongoing), Front door installation, Trimming installation, Drywall work (very small area), Backyard patio, Other small projects ongoing if available, Hourly rate preferred.',
    type: ProjectType.Renovation,
    isOpen: true,
    userId: 'ce03acb0-2a79-4858-87cf-c9f8674537c1',
    address: '2691 Webster Street',
    state: 'CA',
    city: 'Menlo Park',
    country: 'United States'
  },
  {
    id: 'ed3a728e-ec17-42f3-ab34-288215eea267',
    title: 'Need skilled carpenter to install doors (Oakland)',
    description:
      'Need skilled carpenter to install 2 hardwood interior door slabs. Cutting and marking for hinges will be necessary. Also, you must frame a 5ft wall and install two interior hollow doors and reinstall a closet door. Paying $200 total for labor. I can provide a table saw. You should have your own hand tools and power tools.',
    type: ProjectType.Other,
    isOpen: true,
    userId: '7a583aef-d391-41ac-b929-db959de5a77f',
    address: '2105 Wolf Pen Road',
    state: 'CA',
    city: 'Oakland',
    country: 'United States'
  },
  {
    id: 'e020963a-e32a-4fd3-9686-1b67a40e560f',
    title: 'Need to dig trenches in basement (Los Angeles)',
    description:
      'Need to dig two 15 ft long, 2ft deep, 1 foot wide trenches in basement and then mix and pour concrete in trenches. Offering $300 labor to complete those tasks. You will be using pick axes and shovels. You will move the dirt using buckets. One man will take 2 to 3 days to complete.',
    type: ProjectType.Construction,
    isOpen: true,
    userId: '98f83778-7435-4c8c-a02f-0856a5681bea',
    address: '3212 Parkview Drive',
    state: 'CA',
    city: 'Los Angeles',
    country: 'United States'
  },
  {
    id: '5c8481f7-8226-4a85-a21d-d5cc8929addd',
    title: 'Handyman Needed (Corcoran)',
    description:
      'Looking for an experienced handyman. Current work needed: Check and fix water pressure in 2 bathrooms. Patch and fix hole in wall in front of a pipe. Repair hole/scratches in door. Fix towel racks and doorframe. Recaulk 2 bathrooms. Replace over the hood microwave Check ice maker. Set auto off hallway switch. Tighten screws for dishwasher. In addition, we need a handyman to help with the ongoing maintenance and repairs of a 3 unit building when needed. Responsibilities include, but are not limited to: Some landscaping/Groundskeeping needed. Some minor Appliance repairs and maintenance. Experienced with performing minor plumbing jobs (de-clogging drains/toilets). Minor Heating & Cooling repairs. Adding/fixing window screens, door jams & screens. Fence repairs and some drywalling. General handyman services.',
    type: ProjectType.Renovation,
    isOpen: true,
    userId: '98f83778-7435-4c8c-a02f-0856a5681bea',
    address: '2830 Half and Half Drive',
    state: 'CA',
    city: 'Corcoran',
    country: 'United States'
  },
  {
    id: 'ecc6e9ef-f356-4f68-aaa0-611b760e2a0b',
    title: 'Handyman needed to assemble cabinet (Sacramento)',
    description:
      'I have one metal cabinet that needs to be assembled in Ledgewood, NJ. Looking for someone to do it today. It’s actually already started and just needs to be finished up. Pictures attached.',
    type: ProjectType.Other,
    isOpen: true,
    userId: 'b16b75fb-2fc8-40e5-b1dc-c694dcf0cb4b',
    address: '3491 Francis Mine',
    state: 'CA',
    city: 'Sacramento',
    country: 'United States'
  }
];

export const bids: Bid[] = [
  {
    id: '177c44fe-5384-4156-b1e9-1ddcb82e7037',
    price: 25000,
    projectId: 'ed3a728e-ec17-42f3-ab34-288215eea267',
    userId: 'd0119cf0-cf1c-4ad0-894b-7c411c568831',
    accepted: false
  },
  {
    id: 'da9ba031-c1a2-4f74-a941-b19a8087e925',
    price: 24500,
    projectId: 'ed3a728e-ec17-42f3-ab34-288215eea267',
    userId: 'd9d0edf9-36d6-42f4-a7fb-a8201324478c',
    accepted: false
  },
  {
    id: '475d97ac-3d03-4fc6-a027-3bc76d4097e5',
    price: 68000,
    projectId: 'ecc6e9ef-f356-4f68-aaa0-611b760e2a0b',
    userId: 'b16b75fb-2fc8-40e5-b1dc-c694dcf0cb4b',
    accepted: false
  },
  {
    id: '99b7ddf3-b3ff-43b8-bdcc-c7480e2f75f4',
    price: 47000,
    projectId: '5c8481f7-8226-4a85-a21d-d5cc8929addd',
    userId: 'd0119cf0-cf1c-4ad0-894b-7c411c568831',
    accepted: false
  }
];
