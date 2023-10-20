"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
  let router = useRouter();
  const Session = useSession();
  const { status } = useSession();

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }
  console.log(Session);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div onClick={() => signIn("google")} className={styles.socialButton}>
          Sign in with Google
        </div>
        <div onClick={() => signIn("github")} className={styles.socialButton}>Sign in with Github</div>

      </div>
    </div>
  );
}
