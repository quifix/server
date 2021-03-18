import { PrismaClient } from '@prisma/client';
import { users, projects, bids } from '../temp';

const prisma: PrismaClient = new PrismaClient();

async function main(): Promise<void> {
  for (const user of users) {
    await prisma.users.create({ data: user });
  }

  for (const project of projects) {
    await prisma.projects.create({ data: project });
  }

  for (const bid of bids) {
    await prisma.bids.create({ data: bid });
  }
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
