import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

async function main() {
    try {
        console.log('Connecting to database...');
        const count = await prisma.question.count();
        console.log(`Successfully connected! Found ${count} questions.`);
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
