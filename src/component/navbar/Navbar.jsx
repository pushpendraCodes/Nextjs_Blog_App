"use client";
import Image from "next/image";
import style from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/Theme";


import { useRouter } from "next/navigation";
import {  useState } from "react";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { status } = useSession();
  const { data } = useSession();
  return (
    <>
      <div className={style.container}>
        <div className={style.social}>
          <Image alt="img" width={20} height={20} src="/instagram.png" />
          <Image alt="img" width={20} height={20} src="/facebook.png" />
          <Image alt="img" width={20} height={20} src="/tiktok.png" />
          <Image alt="img" width={20} height={20} src="/youtube.png" />
        </div>
        <div className={style.logoContainer}>
          <Link className={style.logo} href="/">
            <Image width={40} height={40} src="/xing.png" />
            <p>Codewar</p>
          </Link>
        </div>
        <div className={style.links}>
          <ThemeToggle />
          <Link className={style.link} href="/">
            Home
          </Link>
          <Link className={style.link} href="/">
            contact{" "}
          </Link>
          <Link className={style.link} href="/">
            about
          </Link>
          {status == "authenticated" ? (
            <div className={style.a}>
              <Link href="/write" className={style.write}>
                Write
              </Link>
              <Link
                onClick={() => {
                  signOut("google");
                }}
                className={style.loginBtn}
                href="/login"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link className={style.loginBtn} href="/login">
              Login
            </Link>
          )}
          <AuthLinks />
        </div>
      </div>

      <div className={style.responsiveContainer}>
        <div className={style.logo_res}>
          <Link className={style.logo} href="/">
            <Image width={50} height={50} src="/xing.png" />
            <p>Codewar</p>
          </Link>
        </div>

        <div className={style.menu_res}>
          <AuthLinks />
        </div>
      </div>
    </>
  );
};

export default Navbar;
