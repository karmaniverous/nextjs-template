import NextAuth from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

export const authOptions = {
  // Configure one or more authentication providers
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log({ session, token });
      session.id_token = token.id_token;
      return session;
    },
  },
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
