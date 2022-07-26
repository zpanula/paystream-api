import Artist from '../models/artist.js';
import AppError from '../utils/error.js';
import prisma from '../utils/prisma.js';

export const findAll = async () => {
  try {
    return prisma.artist.findMany();
  } catch (err) {
    throw new AppError(500, 'Internal Server Error');
  }
};

export const find = async (id: number) => {
  try {
    return prisma.artist.findUnique({ where: { id } });
  } catch (err) {
    throw new AppError(500, 'Internal Server Error');
  }
};

export const findByName = async (name: string) => {
  try {
    return prisma.artist.findUnique({ where: { name } });
  } catch (err) {
    throw new AppError(500, 'Internal Server Error');
  }
};

export const create = async (artist: Artist) => {
  const existingArtist = await findByName(artist.name);

  if (existingArtist) return null;

  try {
    return prisma.artist.create({
      data: {
        name: artist.name,
        rate: artist.rate,
        streams: artist.streams,
        payout: artist.rate * artist.streams,
        payoutCompleted: artist.payoutCompleted,
      },
    });
  } catch (err) {
    throw new AppError(500, 'Internal Server Error');
  }
};

export const update = async (id: number, artistUpdate: Artist) => {
  const artist = find(id);

  if (!artist) return null;

  try {
    return prisma.artist.update({
      where: { id },
      data: {
        name: artistUpdate.name,
        rate: artistUpdate.rate,
        streams: artistUpdate.streams,
        payout: artistUpdate.rate * artistUpdate.streams,
        payoutCompleted: artistUpdate.payoutCompleted,
      },
    });
  } catch (error) {
    throw new AppError(500, 'Internal Server Error');
  }
};

export const remove = async (id: number) => {
  const artist = find(id);
  if (!artist) return null;

  try {
    return prisma.artist.delete({ where: { id } });
  } catch (err) {
    throw new AppError(500, 'Internal Server Error');
  }
};
