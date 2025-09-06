"use client";
import { MenuOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./userbar.module.css";
import { Cart } from "../cart/cart";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Userbar = ({
  toggleCollapsedMobileMenu,
}: {
  toggleCollapsedMobileMenu: () => void;
}) => {
  const path = usePathname();
  return (
    <div className={styles.userbar}>
      <div className={styles.collapsedItem}>
        <SearchOutlined className={styles.icon} />
      </div>
      <div
        className={`${styles.collapsedItem} ${
          path === "/profile" ? styles.active : ""
        }`}
      >
        <Link href="/profile">
          <UserOutlined className={styles.icon} />
        </Link>
      </div>
      <Cart />
      <div onClick={toggleCollapsedMobileMenu} className={styles.collapsedMenu}>
        <MenuOutlined className={styles.icon} />
      </div>
    </div>
  );
};
