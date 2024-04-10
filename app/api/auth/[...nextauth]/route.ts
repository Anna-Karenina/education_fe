import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/app/lib/auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

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
        if (credentials === null) return null;
        const payload = JSON.stringify({
          identifier: credentials.email,
          password: credentials.password,
        });
        try {
          const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
            method: "POST",
            // redirect: "follow",
            headers: {
              "Content-Type": "application/json",
            },
            body: payload,
          });
          if (!res.ok) {
            console.log("some shit");
            throw new Error("authorize error");
          } else {
            const data = await res.json();
            console.log("data", data, "\n");

            return { ...data.user, jwt: data.jwt };
          }
        } catch (error) {
          throw new Error("authorize error");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (!token.jwt) {
        return Promise.reject("no jwt");
      }
      session.id = token.id;
      session.jwt = token.jwt;
      session.user = {
        ...session.user,
        lastName: token.lastName,
        firstName: token.firstName,
        blocked: token.blocked,
      };
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.blocked = user.blocked;
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
  },
});

export { handler as GET, handler as POST };
