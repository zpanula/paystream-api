import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as ArtistService from '../services/artist.js';
import Artist, { artistSchema } from '../models/artist.js';
import AppError from '../utils/error.js';
import validateBody from '../middleware/validation.js';

const artistRouter = express.Router();

artistRouter.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const result: Artist[] = await ArtistService.findAll();
    res.status(200).json(result);
  })
);

artistRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const result = await ArtistService.find(id);
    if (!result) throw new AppError(404, 'Artist does not exist.');
    res.status(200).json(result);
  })
);

artistRouter.post(
  '/',
  validateBody(artistSchema),
  async (req: Request, res: Response) => {
    const artist: Artist = req.body;

    const result = await ArtistService.create(artist);
    if (!result) throw new AppError(400, 'Artist already exists.');

    res.status(200).json(result);
  }
);

artistRouter.put(
  '/:id',
  validateBody(artistSchema),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const artist: Artist = req.body;

    const existingArtist = await ArtistService.find(id);

    if (!existingArtist) throw new AppError(404, 'Artist does not exist.');
    const result = await ArtistService.update(id, artist);
    res.status(200).json(result);
  }
);

artistRouter.delete('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  const existingArtist = await ArtistService.find(id);

  if (!existingArtist) throw new AppError(404, 'Artist does not exist.');
  await ArtistService.remove(id);
  res.sendStatus(204);
});

export default artistRouter;
