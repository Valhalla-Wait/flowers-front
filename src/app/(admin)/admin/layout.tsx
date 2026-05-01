"use client";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import AdminNavbar from "@/components/admin/adminNavbar/adminNavbar";
import React, { useEffect, useState } from "react";
import { Roles } from "@/core/net/types";
import { useRouter } from "next/navigation";
import styles from "./layout.module.css";
import { MobileMenuContext } from "@/hooks/useMobileMenu";
import { Loader } from "@/components/loader";
import { AuthRequests } from "@/core/net/auth";
import { useQuery } from "@tanstack/react-query";

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // const profile = useStore((store) => store.profile);
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
  });
  // const isProfileLoading = useStore((store) => store.isProfileLoading);
  const [collapsedMobileMenu, setCollapsedMobileMenu] = useState(true);

  const toggleCollapsedMobileMenu = () =>
    setCollapsedMobileMenu(!collapsedMobileMenu);
  const closeCollapsedMobileMenu = () => setCollapsedMobileMenu(true);

  useEffect(() => {
    // Если профиль еще загружается, ничего не делаем
    // Если профиль загружен и роль не ADMIN, перенаправляем на страницу входа
    if (!isLoading) {
      if (!profile || profile?.role !== Roles.ADMIN) {
        router.replace("/admin/login");
      }
    }
  }, [profile, isLoading]);

  // Показываем загрузку, пока проверяем аутентификацию
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout hasSider={true} className="layout" style={{ minHeight: "100vh" }}>
      <MobileMenuContext.Provider
        value={{
          isCollapse: collapsedMobileMenu,
          toggleCollapse: toggleCollapsedMobileMenu,
          closeCollapse: closeCollapsedMobileMenu,
        }}
      >
        <Sider className={styles.sider}>
          <div className="logo" />
          <AdminNavbar />
        </Sider>
        <Layout className="site-layout">{children}</Layout>
      </MobileMenuContext.Provider>
    </Layout>
  );
}
