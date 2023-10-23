

import Image from "next/image";
import style from "./card.module.css";
import Link from "next/link";

export default function Card({ post }) {

  return (
    <div className={style.posts}>
      <div className={style.post}>
        <div className={style.ImageContainer}>
          <Image
            alt="img"
            className={style.img}
            width={300}
            height={250}
            src={post?.img}
            style={{objectFit:"cover"}}
          />
        </div>
        <div className={style.textContainer}>
          <div style={{ display: "flex", gap: "5px" }}>
            <p className={style.date}>
              {new Date(post?.createdAt).toDateString()} -
            </p>
            <p className={style.category}>{post?.category}</p>
          </div>

          <h2 className={style.heading}>{post?.title}</h2>
          <div
            className={style.desc}
            dangerouslySetInnerHTML={{ __html: post?.story.substring(0, 150) }}
          />

          <Link href={`/posts/${post._id}`} className={style.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
