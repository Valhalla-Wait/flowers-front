"use client";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReactQueryProvider from "@/providers/reactQuery";
import { CollapsedMenu } from "@/components/collapsedMenu/collapsedMenu";
import { Header } from "@/components/header/header";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { Footer } from "@/components/footer/footer";
import AuthProvider from "@/providers/authProvider";
import Cookies from "js-cookie";
import { CartStoreType, useStore } from "@/core/store/store";
import { useShallow } from "zustand/shallow";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const poppinsLighter = localFont({
  src: "../assets/fonts/Poppins-Light.ttf",
  variable: "--font-poppins-lighter",
});
const poppinsBold = localFont({
  src: "../assets/fonts/Poppins-Bold.ttf",
  variable: "--font-poppins-bold",
});

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
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppinsLighter.variable} ${poppinsBold.variable}`}
      >
        <ReactQueryProvider>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                components: {
                  Breadcrumb: {
                    colorLinkActive: "black",
                    linkColor: "#888888",
                    colorBgTextHover: "none",
                    fontSize: 12,
                  },
                },
              }}
            >
              <AuthProvider>
                <div className={styles.page}>
                  <CollapsedMenu
                    toggleCollapse={toggleCollapsedMobileMenu}
                    collapse={collapsedMobileMenu}
                  />
                  <div className={styles.mainBlock}>
                    <Header
                      toggleCollapsedMobileMenu={toggleCollapsedMobileMenu}
                    />
                    <main className={styles.main}>{children}</main>
                  </div>
                  <Footer />
                </div>
              </AuthProvider>
            </ConfigProvider>
          </AntdRegistry>
          <ReactQueryDevtools position="bottom" initialIsOpen={true} />
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
