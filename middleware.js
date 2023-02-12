import { withAuth } from 'next-auth/middleware';

import { Logger } from '@karmaniverous/edge-logger';
const logger = new Logger({ maxLevel: process.env.LOG_LEVEL });

export default withAuth(
  async (req, res) => {
    logger.debug('*** middleware withAuth ***', { req, res });
  },
  {
    callbacks: {
      authorized: (input) => {
        logger.debug('*** middleware authorized ***', { ...input });
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/private'],
};
