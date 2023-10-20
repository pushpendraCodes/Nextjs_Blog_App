import Image from "next/image";
import styles from "./feature.module.css";
export default function Feature() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2 >Hey welcome to codewar  !</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className={styles.main}>
        <div className={styles.image}>
          <Image alt="img" className={styles.img} width={400} height={300} src="/coding.png" />
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
            repellat ad eum optio culpa fuga?
          </h2>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            quidem voluptates consequuntur repellat! Quibusdam delectus quo
            animi similique odit dolor cumque nam. Inventore, temporibus
            dolores!
          </p>
          <button className={styles.btn}>Read more</button>
        </div>
      </div>
    </div>
  );
}
