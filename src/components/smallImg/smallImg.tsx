import { CSSProperties } from "react";
import styles from "./smallImg.module.css";

type PropsType = {
  src: string;
  notInStock?: boolean;
  style?: CSSProperties;
  alt?: string;
};

export const SmallImg = ({ src, style, alt, notInStock }: PropsType) => {
  return (
    <div className={styles.container}>
      {notInStock ? (
        <div className={styles.disabled}>
          <p className={styles.disabledTitle}>Нет в наличии</p>
        </div>
      ) : (
        <></>
      )}
      <img style={style} className={styles.photo} alt={alt} src={src} />
    </div>
  );
};
