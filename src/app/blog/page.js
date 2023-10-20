"use client"
import Cardlist from "@/component/cardList/Cardlist";
import Menu from "@/component/menu/Menu";
import styles from "./blog.module.css";
import { useSearchParams } from 'next/navigation'
export default function BlogPage() {
  const searchParams = useSearchParams()

  const category = searchParams.get('cat')
  console.log(category)
  return (
    <div className={styles.container}>
    <h2 className={styles.category}>{category} Blog</h2>
      <div className={styles.blog}>
        <Cardlist category={category} />
        <Menu />
      </div>
    </div>
  );
}
