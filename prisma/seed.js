/* eslint-disable no-console */
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const roster = JSON.parse(
  fs.readFileSync('./prisma/roster.json').toString()
).data;
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.artist.deleteMany();
    await prisma.$queryRaw`DELETE FROM sqlite_sequence WHERE name = 'Artist';`;
    console.log('Deleted records in artist table');

    let artist;
    roster.forEach(async (row) => {
      artist = {
        name: row.artist,
        rate: row.rate,
        streams: row.streams,
        payout: row.streams * row.rate,
      };

      await prisma.artist.create({ data: artist });
    });
    console.log('Added artist data');
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
