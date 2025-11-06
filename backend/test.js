import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany(); // clear table for testing

  const hashedPassword = await bcrypt.hash('securepassword', 10);

  const newUser = await prisma.user.create({
    data: {
      email: 'nolan@example.com',
      password: hashedPassword,
      name: 'Nolan',
    },
  });

  console.log(newUser);

  const users = await prisma.user.findMany();
  console.log(users);
}


main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
