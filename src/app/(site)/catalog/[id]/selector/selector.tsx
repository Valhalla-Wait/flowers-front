import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./selector.module.css";
import { ChangeEvent } from "react";

type SelectorProps = {
  count: number;
  increment: () => void;
  decrement: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Selector({
  count,
  increment,
  decrement,
  onChange,
}: SelectorProps) {
  return (
    <div className={styles.container}>
      <button onClick={decrement} className={styles.btn}>
        <MinusOutlined />
      </button>
      <input className={styles.selector} onChange={onChange} value={count} />
      <button onClick={increment} className={styles.btn}>
        <PlusOutlined />
      </button>
    </div>
  );
}
