// src/lib/client.tsx
"use client";
import { HttpLink, ApolloLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { useSession, getSession } from "next-auth/react";
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

const authLink = setContext(async (_, { headers }) => {
  let { jwt = "" } = await getSession();

  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : "",
    },
  };
});

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: `${STRAPI_URL}/graphql`,
    credentials: "same-origin",
  });
  const fullLink = from([authLink, httpLink]);

  return new NextSSRApolloClient({
    credentials: "include",
    cache: new NextSSRInMemoryCache(),

    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            fullLink,
          ])
        : fullLink,
  });
};

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
