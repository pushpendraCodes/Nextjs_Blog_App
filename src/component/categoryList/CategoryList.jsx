"use client"
import Image from "next/image";
import Pagination from "../pagination/Pagination";
import styles from "./categoryList.module.css";
import { category } from "@/util/category";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync, getPage, getPageSize } from "../cardList/PostsSlice";
import { MdSearch } from "react-icons/md";
import { useState } from "react";

const CategoryList = () => {
  let page = useSelector(getPage);
  let pagesize = useSelector(getPageSize);
  let dispatch = useDispatch()
  const[search,setSearch]=useState("")

  function filterCategory(category) {
    let pagination = {
      page: page,
      pagesize: pagesize,
    };
    dispatch(fetchPostsAsync({ pagination ,category }));
  }


  function searchPosts() {
    let pagination = {
      page: 1,
      pagesize: pagesize,
    };
    dispatch(fetchPostsAsync({ pagination ,search }));
  }

  function allPost() {
    setSearch("")
    let pagination = {
      page: page,
      pagesize: pagesize,
    };
    dispatch(fetchPostsAsync({ pagination  }));
  }


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Popular Categories</h2>
      <div className={styles.categories}>
        {category.map((item, i) => {
          return (
            <div key={i}
              onClick={() => filterCategory(item.name)}
              style={{ backgroundColor: item.bg }}
              className={styles.category}
            >
              <Image
                className={styles.img}
                width={15}
                height={15}
                src={item.img}
                alt="img"
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
     <div className={styles.search}>
     <button onClick={allPost} className={styles.btn}>All</button>
      <input value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="search" className={styles.search_input} type="text" />
      <MdSearch onClick={searchPosts} className={styles.searchIcon} size={25} />
     </div>
    </div>
  );
};

export default CategoryList;
