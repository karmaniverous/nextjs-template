import { withAuth } from 'next-auth/middleware';

export const middleware = withAuth((req) => {
  console.log(req);
});

export const config = {
  matcher: ['/private'],
};
