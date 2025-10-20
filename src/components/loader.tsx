import React from "react";
import { Spin } from "antd";
import styles from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Spin size="large" />
    </div>
  );
};
