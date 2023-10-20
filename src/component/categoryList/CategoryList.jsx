"use client"
import Image from "next/image";
import Pagination from "../pagination/Pagination";
import styles from "./categoryList.module.css";
import { category } from "@/util/category";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync, getPage, getPageSize } from "../cardList/PostsSlice";
const CategoryList = () => {
  let page = useSelector(getPage);
  let pagesize = useSelector(getPageSize);
  let dispatch = useDispatch()
  function filterCategory(category) {
    let pagination = {
      page: page,
      pagesize: pagesize,
    };
    dispatch(fetchPostsAsync({ pagination ,category }));
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
    </div>
  );
};

export default CategoryList;
