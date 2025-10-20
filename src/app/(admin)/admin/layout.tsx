"use client";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import AdminNavbar from "@/components/admin/adminNavbar/adminNavbar";
import React, { useEffect, useState } from "react";
import { useStore } from "@/core/store/store";
import { Roles } from "@/core/net/types";
import { useRouter } from "next/navigation";
import styles from "./layout.module.css";
import { MobileMenuContext } from "@/hooks/useMobileMenu";

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const profile = useStore((store) => store.profile);
  const [collapsedMobileMenu, setCollapsedMobileMenu] = useState(true);

  const toggleCollapsedMobileMenu = () =>
    setCollapsedMobileMenu(!collapsedMobileMenu);
  const closeCollapsedMobileMenu = () => setCollapsedMobileMenu(true);

  useEffect(() => {
    if (profile?.role !== Roles.ADMIN) {
      router.replace("/admin/login");
    }
  }, [profile]);

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
