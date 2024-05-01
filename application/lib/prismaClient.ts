import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

main().catch((err) => console.error(err));
