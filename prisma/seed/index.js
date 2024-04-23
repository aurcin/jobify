const { PrismaClient } = require('@prisma/client');

const data = require('./data.json');

const prisma = new PrismaClient();

async function seedDatabaseWithTestJobs() {
  const clerkId = 'user_2eYdVqAHkl5mZNsKeyfJOfqe3Iu';

  const jobs = data.map(job => {
    return {
      ...job,
      clerkId,
    };
  });

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}

seedDatabaseWithTestJobs()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
