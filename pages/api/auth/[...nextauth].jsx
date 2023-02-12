import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

import { Logger } from '@karmaniverous/edge-logger';
const logger = new Logger({ maxLevel: process.env.LOG_LEVEL });

export const authOptions = {
  callbacks: {
    jwt: async (input) => {
      logger
        .truncate(100, '*** NextAuth jwt callback ***', {
          ...input,
        })
        .debug();

      if (input.account) {
        input.token.id_token = input.account.id_token;
      }

      return input.token;
    },

    redirect: async (input) => {
      logger
        .truncate(100, '*** NextAuth redirect callback ***', {
          ...input,
        })
        .debug();

      return input.baseUrl;
    },

    session: async (input) => {
      logger
        .truncate(100, '*** NextAuth session callback ***', {
          ...input,
        })
        .debug();

      input.session.id_token = input.token.id_token;

      return input.session;
    },

    signIn: async (input) => {
      logger
        .truncate(100, '*** NextAuth signIn callback ***', {
          ...input,
        })
        .debug();

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

logger.debug('*** NextAuth options ***', {
  providers: authOptions.providers,
  secret: authOptions.secret,
});

export default NextAuth(authOptions);
