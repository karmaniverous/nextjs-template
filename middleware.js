import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth({});

export const config = {
  matcher: ['/private'],
};
