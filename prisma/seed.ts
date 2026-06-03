// IA Artisan — seed script
// Run with: npm run db:seed
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding IA Artisan database…');

  // Demo user (particulier)
  const user = await prisma.user.upsert({
    where: { email: 'demo@ia-artisan.fr' },
    update: {},
    create: {
      email: 'demo@ia-artisan.fr',
      name: 'Utilisateur Demo',
      role: 'particulier',
      plan: 'free',
      diagnosticsLeft: 1,
    },
  });

  // Demo artisan
  const artisan = await prisma.user.upsert({
    where: { email: 'artisan@ia-artisan.fr' },
    update: {},
    create: {
      email: 'artisan@ia-artisan.fr',
      name: 'Jean-Michel Rivière',
      role: 'artisan',
      plan: 'artisan',
      diagnosticsLeft: 0,
      artisanProfile: {
        create: {
          companyName: 'JMR Électricité',
          siret: '12345678901234',
          domains: ['electricite', 'securite_incendie'],
          city: 'Lyon',
          postalCode: '69003',
          bio: 'Électricien certifié avec 15 ans d\'expérience.',
          rating: 4.9,
          reviewCount: 87,
          verified: true,
        },
      },
    },
  });

  console.log('Created users:', user.email, artisan.email);
  console.log('Done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
