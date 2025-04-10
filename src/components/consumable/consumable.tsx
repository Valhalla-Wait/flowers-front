import { ConsumableType } from "@/common/types";
import styles from "./consumable.module.css";

export const Consumable = ({ title }: { title: string }) => {
  return <div className={styles.container}>{title}</div>;
};
