import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'admin123',
    10
  );

  const user = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@techai.pk' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@techai.pk',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', user);

  // Create default site settings
  const settings = [
    { key: 'site_title', value: 'techai.pk' },
    { key: 'site_description', value: 'Learn It. Build It. Automate It.' },
    { key: 'site_email', value: 'contact@techai.pk' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('Site settings created');
  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
