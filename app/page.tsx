"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Link } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";
import AuthActions from "./auth/sign-in/components/auth-action";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;
  }, [session]);

  return (
    <main className={styles.main}>
      <Box
        w="100%"
        borderBottom="1px solid"
        borderColor="gray.200"
        p="1rem"
        display="flex"
        justifyContent="space-between"
      >
        {"_"}
        <Box>
          <AuthActions />
        </Box>
      </Box>
      <div className={styles.description}>
        <p>Aurhorized: {session ? "yes" : "no"}</p>

        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/logo.png"
              alt="logo Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/logo2.png"
          alt="Logo2"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link
          href="/platform"
          className={styles.card}
        >
          <h2>
            Solitaire of tenses <span>-&gt;</span>
          </h2>
          <p>Try your skills in game.</p>
        </Link>

        <a
          href="https://dictionary.skyeng.ru/doc/api/external"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Skyeng Api <span>-&gt;</span>
          </h2>
          <p>Learn about Skyeng Dictionary API documentation!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
