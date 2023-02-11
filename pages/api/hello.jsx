import { Logger } from '@karmaniverous/edge-logger';
const logger = new Logger();

export default async (req, res) => {
  logger.debug('*** API hello ***', { req });

  res.status(200).json({ message: 'Hello, world!' });
};
