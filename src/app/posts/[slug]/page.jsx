"use client";
import Menu from "@/component/menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comment from "@/component/comments/Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAsync, getSinglepost } from "@/component/cardList/PostsSlice";
import { useEffect } from "react";
import SkeletonLoading from "@/component/skelton_loading/SkeletonLoading";
import { getStatus } from "@/app/write/BlogSlice";
import { useSession } from "next-auth/react";
export default function SinglePage({ params }) {
  const { slug } = params;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostAsync(slug));
  }, [dispatch]);

  let status = useSelector(getStatus);
  console.log(status,"status")
  let blogPost = useSelector(getSinglepost);

  // const { status } = useSession();

  // if (status === "loading") {
  //   return <div className={styles.loading}>Loading...</div>;
  // }
  return (
    <div className={styles.container}>
      {status === "post_pending" ? (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      ) : (
        <div className={styles.headingContainer}>
          <div className={styles.textContainer}>
            <h2>{blogPost.title}</h2>
            <div className={styles.userContainer}>
              <Image
                alt="img"
                width={60}
                height={60}
                src={blogPost.userPic}
              />
              <div className={styles.userName}>
                <h4>{blogPost?.userName}</h4>
                <p>{new Date(blogPost?.createdAt).toDateString()}</p>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
            className={styles.blogImg}
              alt="img"
              width={400}
              height={300}
              src={blogPost?.img}

            />
          </div>
        </div>
      )}
      <div className={styles.contentContainer}>
        <div className={styles.blogContainer}>
          {status !== "post_pending" ? (
            <div
            className={styles.blogText}
              dangerouslySetInnerHTML={{
                __html: blogPost?.story,
              }}
            />
          ) : (
            <>
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </>
          )}

          <Comment post={blogPost} />
        </div>

        <div className={styles.menuContainer}>
          <Menu />
        </div>
      </div>
    </div>
  );
}
