"use client";
import Image from "next/image";
import Link from "next/link";

import styles from "./menupost.module.css";

import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularPostAsync,
  getPopularPost,
  getStatus,
} from "../cardList/PostsSlice";
import { useEffect } from "react";
import SkeletonLoading from "../skelton_loading/SkeletonLoading";

const MenuPosts = ({ withImage }) => {
  let dispatch = useDispatch();
  useEffect(() => {
    console.log("working");
    dispatch(fetchPopularPostAsync());
  }, [dispatch]);
  let popularPosts = useSelector(getPopularPost);
  let status = useSelector(getStatus);

  return (
    <div className={styles.items}>
      {popularPosts.length > 0 &&
        status ===
          "idel" &&(
            popularPosts.map((item, i) => {
              const backgroundColors = [
                "#789cff",
                "#775aec",
                "#ff7887",
                "#7fb881",
                "#ffb14f",
              ];
              return (
                <Link
                  key={item._id}
                  href={`/posts/${item._id}`}
                  className={styles.item}
                >
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
                    <span
                      style={{ backgroundColor: backgroundColors[i] }}
                      className={`${styles.category} `}
                    >
                      {item.category}
                    </span>
                    <h3 className={styles.postTitle}>{item.title}</h3>
                    <div className={styles.detail}>
                      <span className={styles.username}>{item.userName}</span>
                      <span className={styles.date}>
                        {" "}
                        - {new Date(item.createdAt).toDateString()}{" "}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })
          )}

      {status == "pending" && (
        <>
          <SkeletonLoading/>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}

      {(popularPosts.length<1 && status == "idel" && <p>no posts found</p>)}
    </div>
  );
};

export default MenuPosts;
