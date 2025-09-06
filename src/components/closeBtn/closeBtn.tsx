import { CSSProperties } from "react";
import styles from "./closeBtn.module.css";
import { CloseOutlined } from "@ant-design/icons";

type PropsType = {
  callback?: () => void;
  style?: CSSProperties;
};

export const CloseBtn = ({ callback, style }: PropsType) => {
  return (
    <button style={style} onClick={callback} className={styles.btn}>
      <CloseOutlined />
    </button>
  );
};
