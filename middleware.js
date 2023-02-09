import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async (req /*, res*/) => {
    console.log({ function: 'withAuth', req });
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log({ function: 'authorized', req, token });
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/private'],
};
