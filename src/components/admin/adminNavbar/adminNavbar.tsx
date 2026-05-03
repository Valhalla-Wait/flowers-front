"use client";
import { AuthRequests } from "@/core/net/auth";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import {
  AppstoreAddOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  {
    key: "3",
    icon: <ShoppingCartOutlined />,
    href: "/admin/orders",
    label: "Заказы",
  },
  {
    key: "4",
    icon: <HomeOutlined />,
    href: "/",
    label: "Выход",
    callback: AuthRequests.Logout
  },
];

export default function AdminNavbar() {
  const { closeCollapse } = useMobileMenu();

  const path = usePathname();
  const selectedKey = navItems.find((item) => item.href === path)?.key ?? "1";

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={navItems.map((item) => ({
          ...item,
          label: <Link href={item.href}>{item.label}</Link>,
          onClick: item?.callback ?? closeCollapse,
        }))}
      />
    </>
  );
}
