import { Logger } from '@karmaniverous/edge-logger';
const logger = new Logger({ maxLevel: process.env.LOG_LEVEL });

export default async (req, res) => {
  logger.debug('*** API hello ***', { req });

  res.status(200).json({ message: 'Hello, world!' });
};
