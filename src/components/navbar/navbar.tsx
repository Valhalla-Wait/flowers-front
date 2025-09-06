import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useStore } from "@/core/store/store";
import { useEffect, useState } from "react";

export const mainNavigationItems = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Каталог",
    href: "/catalog",
  },
  {
    title: "Корзина",
    href: "/cart",
  },
];

export const authNavigationItems = [
  ...mainNavigationItems,
  {
    title: "Мои заказы",
    href: "/orders",
  },
  {
    title: "Избранное",
    href: "/wishlist",
  },
];

export const Navbar = (props?: { additionalStyle?: string }) => {
  const path = usePathname();

  const [navItems, setNavItems] = useState(mainNavigationItems);
  const profile = useStore((state) => state.profile);

  useEffect(() => {
    if (profile) {
      setNavItems(authNavigationItems);
    } else {
      setNavItems(mainNavigationItems);
    }
  }, [profile]);

  return (
    <div
      className={
        props?.additionalStyle
          ? `${props.additionalStyle} ${styles.navbar}`
          : styles.navbar
      }
    >
      {navItems.map((item, index) => (
        <div key={index} className={styles.navbarItem}>
          <div
            className={
              path === item.href
                ? `${styles.active} ${styles.navbarItemText}`
                : styles.navbarItemText
            }
          >
            <Link href={item.href}>{item.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};
