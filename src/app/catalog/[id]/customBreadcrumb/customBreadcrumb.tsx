import React from "react";
import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import styles from "./customBreadcrumb.module.css";

const items: BreadcrumbItemType[] = [
  {
    title: "Каталог",
    href: "/catalog",
    className: styles.item,
  },
  {
    title: ":productName",
    href: "",
    className: `${styles.item} ${styles.active}`,
  },
];

export const CustomBreadcrumb = ({ productName }: { productName: string }) => (
  <div className={styles.container}>
    <Breadcrumb
      separator={<RightOutlined />}
      items={items}
      params={{
        productName,
      }}
    />
  </div>
);
