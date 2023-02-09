import _ from 'lodash';
import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

// Recursively truncate long string properties of an object.
const truncate = (obj, maxLen = 20) => {
  for (const key in obj) {
    if (_.isString(obj[key]) && obj[key].length > maxLen) {
      obj[key] = `${obj[key].slice(0, Math.trunc(maxLen / 2))}...${obj[
        key
      ].slice(-Math.trunc(maxLen / 2))}`;
    } else if (_.isPlainObject(obj[key])) {
      truncate(obj[key]);
    }
  }
};

export const authOptions = {
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      console.log(
        truncate({
          callback: 'jwt',
          token,
          user,
          account,
          profile,
          isNewUser,
        })
      );

      if (account) {
        token.id_token = account.id_token;
      }

      return token;
    },

    redirect: async ({ url, baseUrl }) => {
      console.log(truncate({ callback: 'redirect', url, baseUrl }));

      return baseUrl;
    },

    session: async ({ session, user, token }) => {
      console.log(truncate({ callback: 'session', session, user, token }));

      session.id_token = token.id_token;

      return session;
    },

    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log(
        truncate({
          callback: 'signIn',
          user,
          account,
          profile,
          email,
          credentials,
        })
      );

      return true;
    },
  },

  // Configure one or more authentication providers
  providers: [
    CognitoProvider({
      checks: 'nonce',
      clientId: process.env.NEXTAUTH_COGNITO_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_COGNITO_CLIENT_SECRET,
      issuer: `https://cognito-idp.${process.env.NEXTAUTH_COGNITO_REGION}.amazonaws.com/${process.env.NEXTAUTH_COGNITO_USER_POOL_ID}`,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
