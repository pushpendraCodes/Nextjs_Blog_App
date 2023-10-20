import Image from "next/image";
import style from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.logo}>
          <Image alt="img" width={60} height={60} src="/logo.png" />
          <h2>Codewar</h2>
        </div>
        <div className={style.desc}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            tempore labore ipsum quas repellendus iure provident, iste, pariatur
            voluptatum dolorum odio voluptas nihil quos. Illum eligendi
            praesentium reiciendis consequuntur accusantium.
          </p>
        </div>
        <div className={style.social}>
          <Image alt="img" width={20} height={20} src="/instagram.png" />
          <Image alt="img" width={20} height={20} src="/facebook.png" />
          <Image alt="img" width={20} height={20} src="/tiktok.png" />
          <Image alt="img" width={20} height={20} src="/youtube.png" />
        </div>
      </div>
      <div className={style.right}>
        <div className={style.links}>
         <h2>Links</h2>
          <Link className={style.link} href="/">HomePage</Link>
          <Link className={style.link} href="/">Blog</Link>
          <Link className={style.link} href="/">About</Link>
          <Link className={style.link} href="/">Contact</Link>
        </div>
        <div className={style.tags}>
        <h2>Tags</h2>
          <Link  className={style.link} href="/">Style</Link>
          <Link className={style.link} href="/">Fashion</Link>
          <Link className={style.link} href="/">Coding</Link>
          <Link className={style.link} href="/">Travel</Link>
        </div>
        <div className={style.socials}>
        <h2>Social</h2>
          <Link className={style.link} href="/">Facebook</Link>
          <Link className={style.link} href="/">Instagram</Link>
          <Link className={style.link} href="/">Twiiter</Link>
          <Link className={style.link} href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
