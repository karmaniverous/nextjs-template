import { withAuth } from 'next-auth/middleware';

export default withAuth(async (req /*, res*/) => {
  console.log(req);
});

export const config = {
  matcher: ['/private'],
};
