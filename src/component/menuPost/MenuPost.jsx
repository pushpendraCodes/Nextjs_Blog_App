"use client"
import Image from "next/image";
import Link from "next/link";

import styles from "./menupost.module.css";

import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPostAsync, getPopularPost } from "../cardList/PostsSlice";
import { useEffect } from "react";

const MenuPosts = ({ withImage }) => {
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("working")
    dispatch(fetchPopularPostAsync());
  }, [dispatch]);
  let popularPosts = useSelector(getPopularPost);
  console.log(popularPosts, "popular");

  return (
    <div className={styles.items}>
      {popularPosts.length>0 ? (
        popularPosts.map((item,i) => {
          const backgroundColors = ['#789cff', '#775aec', '#ff7887', '#7fb881', '#ffb14f']
          return (
            <Link key={item._id} href={`/posts/${item._id}`} className={styles.item}>
              {withImage && (
                <div className={styles.imageContainer}>
                  <Image
                    src={item.userPic}
                    alt="img"
                    fill
                    className={styles.image}
                  />
                </div>
              )}
              <div className={styles.textContainer}>
                <span style={{ backgroundColor: backgroundColors[i ] }} className={`${styles.category} `}>
                {item.category}
                </span>
                <h3 className={styles.postTitle}>
                {
                  item.title
                }
                </h3>
                <div className={styles.detail}>
                  <span className={styles.username}>{item.userName}</span>
                  <span className={styles.date}> - {new Date(item.createdAt).toDateString()} </span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
    </div>
  );
};

export default MenuPosts;
