import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/app/lib/auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { ...user, jwt };
        } catch (error) {
          console.warn(error);
          return null;
        }
      },
    }),
  ],
  debug: true,
  callbacks: {
    session: async ({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
});

export { handler as GET, handler as POST };
