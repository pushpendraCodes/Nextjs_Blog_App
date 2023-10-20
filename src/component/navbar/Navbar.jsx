"use client";
import Image from "next/image";
import style from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/Theme";
import { MdArrowDropDown } from "react-icons/md";
import { useSession } from "next-auth/react";
import userImage from "../../../public/user.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {


  const [progress, setProgress] = useState(0);
  const router = useRouter();

//   useEffect(() => {

//     // START VALUE - WHEN LOADING WILL START
//      router.events.on("routeChangeStart", () => {
//             setProgress(40);
//       });

//     // COMPLETE VALUE - WHEN LOADING IS FINISHED
//      router.events.on("routeChangeComplete", () => {
//             setProgress(100);
//        });

// }, []);
  return (
    <>
      {/* <LoadingBar
        color="rgb(180, 130, 251)"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      /> */}

      <div className={style.container}>
        <div className={style.social}>
          <Image  alt="img" width={20} height={20} src="/instagram.png" />
          <Image alt="img" width={20} height={20} src="/facebook.png" />
          <Image alt="img" width={20} height={20} src="/tiktok.png" />
          <Image alt="img" width={20} height={20} src="/youtube.png" />
        </div>
        <div className={style.logoContainer}>
          <Link className={style.logo} href="/">
            Codewar
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
          <AuthLinks />
        </div>
      </div>
    </>
  );
};

export default Navbar;
