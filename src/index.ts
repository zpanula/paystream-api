import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger.js';
import errorHandler from './middleware/error-handler.js';
import routeLogger from './middleware/route-logger.js';
import artistRouter from './routes/artists.js';

process.on('uncaughtException', (err: unknown) => {
  logger.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (err: unknown) => {
  logger.error(err);
  process.exit(1);
});

dotenv.config();
const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT as string, 10)
  : 5000;

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routeLogger);
app.use('/artists', artistRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
  logger.info(`Listening on port ${PORT}`);
});
