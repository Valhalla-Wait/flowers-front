"use client";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ReactQueryProvider from "@/providers/reactQuery";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import AuthProvider from "@/providers/authProvider";
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
              <AuthProvider>{children}</AuthProvider>
            </ConfigProvider>
          </AntdRegistry>
          <ReactQueryDevtools position="bottom" initialIsOpen={true} />
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
