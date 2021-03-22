-- AlterTable
ALTER TABLE "Bids" ALTER COLUMN "accepted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "isOpen" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "type" SET DEFAULT E'CUSTOMER';
