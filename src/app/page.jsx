import Link from "next/link";
import styles from "./homepage.module.css";
import Feature from "@/component/feature/Feature";
import Cardlist from "@/component/cardList/Cardlist";
import Menu from "@/component/menu/Menu";
import CategoryList from "@/component/categoryList/CategoryList";


export default function Home() {
  return (
    <div>


      <Feature />
      <CategoryList />
      <div className={styles.container}>
        <Cardlist />
        <Menu />
      </div>
    </div>
  );
}
