export { withAuth as middleware } from 'next-auth/middleware';

export const config = {
  matcher: ['/private'],
};
