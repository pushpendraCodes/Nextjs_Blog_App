
import styles from "./menu.module.css";
import MenuPost from "../menuPost/MenuPost";
import MenuCategories from "../menuCategory/MenuCategories";


function Menu() {



  return (
    <div className={styles.container}>
      <p className={styles.subtitle}>
        Whats <span className={styles.span}>Hot</span>
      </p>
      <h2 className={styles.title}>Most Popular</h2>
      <div className={styles.Posts}>
        <MenuPost withImage={false}  />
      </div>

      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPost  withImage={true} />
    </div>
  );
}

export default Menu;
