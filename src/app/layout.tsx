"use client";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReactQueryProvider from "@/providers/reactQuery";
import { CollapsedMenu } from "@/components/collapsedMenu/collapsedMenu";
import { Header } from "@/components/header/header";
import { useState } from "react";
import styles from "@/app/page.module.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  const [collapsedMobileMenu, setCollapsedMobileMenu] = useState(true)
  
    const toggleCollapsedMobileMenu = () => setCollapsedMobileMenu(!collapsedMobileMenu)

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppinsLighter.variable} ${poppinsBold.variable}`}>
        <ReactQueryProvider>
          <AntdRegistry>
            <div className={styles.page}>
              <CollapsedMenu toggleCollapse={toggleCollapsedMobileMenu} collapse={collapsedMobileMenu} />
              <Header toggleCollapsedMobileMenu={toggleCollapsedMobileMenu} />
              <main className={styles.main}>
                {children}
              </main>
              <footer className={styles.footer}>
                FOOTER
              </footer>
            </div>
          </AntdRegistry>
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
