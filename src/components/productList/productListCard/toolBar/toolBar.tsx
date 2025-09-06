import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import styles from "./toolBar.module.css";

export const ToolBar = ({ toolBarIsHidden }: { toolBarIsHidden: boolean }) => {
  return toolBarIsHidden ? (
    <div className={styles.container}>
      <div className={styles.btn}>
        <EyeOutlined />
      </div>
      <div className={styles.textBtn}>В корзину</div>
      <div className={styles.btn}>
        <HeartOutlined />
      </div>
    </div>
  ) : (
    <></>
  );
};
