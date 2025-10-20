"use client";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import {
  AppstoreAddOutlined,
  LeftOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    key: "1",
    icon: <ShopOutlined />,
    href: "/admin",
    label: "Товары",
  },
  {
    key: "2",
    icon: <AppstoreAddOutlined />,
    href: "/admin/consumables",
    label: "Расходники",
  },
];

export default function AdminNavbar() {
  const { closeCollapse } = useMobileMenu();

  const path = usePathname();
  const selectedKey = navItems.find((item) => item.href === path)?.key ?? "1";

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[selectedKey]}
      items={navItems.map((item) => ({
        ...item,
        label: <Link href={item.href}>{item.label}</Link>,
        onClick: closeCollapse,
      }))}
    />
  );
}
