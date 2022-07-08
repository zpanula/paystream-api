import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger.js';

dotenv.config();
const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string, 10)
  : 5000;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
