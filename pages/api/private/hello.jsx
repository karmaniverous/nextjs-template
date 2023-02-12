// npm imports
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

import { Logger } from '@karmaniverous/edge-logger';
const logger = new Logger({ maxLevel: process.env.LOG_LEVEL });

export default async (req, res) => {
  logger.debug('*** API private/hello ***', { req });

  const session = await getServerSession(req, res, authOptions);
  logger.debug('*** API private/hello session ***', { session });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  res.status(200).json({ message: `Hello ${session.user.email}!` });
};
