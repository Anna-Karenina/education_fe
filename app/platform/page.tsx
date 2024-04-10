"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { RedirectType, redirect } from "next/navigation";

const Platform = () => {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    redirect("/platform/solitaire-of-tenses", RedirectType.replace);
  } else {
    return redirect("/auth/sign-in", RedirectType.replace);
  }
};

export default Platform;
