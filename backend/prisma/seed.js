require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'viewer@demo.com' },
    update: {},
    create: { name: 'Demo Viewer', email: 'viewer@demo.com', password, role: 'VIEWER' },
  });

  await prisma.user.upsert({
    where: { email: 'editor@demo.com' },
    update: {},
    create: { name: 'Demo Editor', email: 'editor@demo.com', password, role: 'EDITOR' },
  });

  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: { name: 'Demo Admin', email: 'admin@demo.com', password, role: 'ADMIN' },
  });

  console.log('Seeded demo accounts');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
