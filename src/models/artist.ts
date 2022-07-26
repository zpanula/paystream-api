import Joi from 'joi';

type Artist = {
  id?: number;
  name: string;
  rate: number;
  streams: number;
  payout: number;
  payoutCompleted?: boolean;
};

export default Artist;
export const artistSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(3).max(50).required(),
  rate: Joi.number().min(0).required(),
  streams: Joi.number().min(0).required(),
  payoutCompleted: Joi.boolean(),
});
