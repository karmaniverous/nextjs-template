export { withAuth as default } from 'next-auth/middleware';

export const config = {
  matcher: ['/private'],
};
