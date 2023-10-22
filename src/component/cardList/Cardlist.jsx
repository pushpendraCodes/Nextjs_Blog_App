"use client";
import Image from "next/image";
import Pagination from "../pagination/Pagination";
import style from "./cardlist.module.css";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPostsAsync,
  getPage,
  getPageSize,
  getPost,
  getStatus,
} from "./PostsSlice";

import SkeletonLoading from "../skelton_loading/SkeletonLoading";
export default function Cardlist({ category }) {
  const page = useSelector(getPage);
  let pagesize = useSelector(getPageSize);
  let status = useSelector(getStatus);

  let dispatch = useDispatch();
  useEffect(() => {
    let pagination = {
      page: page,
      pagesize: pagesize,
    };
    dispatch(fetchPostsAsync({ pagination, category }));
  }, [dispatch, category]);

  let posts = useSelector(getPost);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Recent Post</h1>

      {posts?.length > 0 &&
        posts.map((post) => {
          return <Card key={post._id} post={post} />;
        })}

      {posts.length > 0 && <Pagination />}
      {(posts.length<1 && status == "idel" && <p>no posts found</p>)}
      {status == "pending" && (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}
    </div>
  );
}
