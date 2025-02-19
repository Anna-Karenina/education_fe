"use client";
import Head from "next/head";
import styles from "./sign-in.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (result.ok) {
        router.replace("/");
        return;
      } else {
        console.log("ne ok");
      }
    } catch (error) {
      console.log(error);

      alert("Credential is not valid");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Strapi - Next - NextAuth</title>
      </Head>
      <h1>Sign In</h1>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
        />
        <label
          style={{
            marginTop: 10,
          }}
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
        />
        <button
          className={styles.button}
          style={{
            marginTop: 15,
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
