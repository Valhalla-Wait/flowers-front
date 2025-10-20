"use client";
import "./../globals.css";
import { CollapsedMenu } from "@/components/collapsedMenu/collapsedMenu";
import { Header } from "@/components/header/header";
import { useEffect, useState } from "react";
import styles from "@/app/(site)/page.module.css";
import { Footer } from "@/components/footer/footer";
import Cookies from "js-cookie";
import { CartStoreType, useStore } from "@/core/store/store";
import { useShallow } from "zustand/shallow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Сделать доп. обертку, чтобы юзать layout без use client
  const [collapsedMobileMenu, setCollapsedMobileMenu] = useState(true);
  const { tempCart, setTempCart } = useStore(
    useShallow(({ tempCart, setTempCart }) => ({
      tempCart,
      setTempCart,
    }))
  );

  useEffect(() => {
    const cookiesTempCart = Cookies.get("tempCart");

    let preparedCookieTempCart: CartStoreType | null = null;

    if (cookiesTempCart) {
      preparedCookieTempCart = JSON.parse(cookiesTempCart) as CartStoreType;
    }

    if (
      !tempCart.productsData.length &&
      preparedCookieTempCart?.productsData.length
    ) {
      setTempCart(preparedCookieTempCart);
    }
  }, [tempCart]);

  const toggleCollapsedMobileMenu = () =>
    setCollapsedMobileMenu(!collapsedMobileMenu);

  return (
    <div className={styles.page}>
      <CollapsedMenu
        toggleCollapse={toggleCollapsedMobileMenu}
        collapse={collapsedMobileMenu}
      />
      <div className={styles.mainBlock}>
        <Header toggleCollapsedMobileMenu={toggleCollapsedMobileMenu} />
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
