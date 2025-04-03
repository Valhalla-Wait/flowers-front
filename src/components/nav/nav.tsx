"use client"
import { AppstoreAddOutlined, MenuFoldOutlined, MenuUnfoldOutlined, NodeCollapseOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState } from "react";

const navItems = [
  // {
  //   key: '0',
  // },
  {
    key: '1',
    icon: <ShopOutlined />,
    href: '/admin',
    label: 'Товары',
  },
  {
    key: '2',
    icon: <AppstoreAddOutlined />,
    href: '/admin/consumables',
    label: 'Расходники',
  },
]

export default function Nav() {
  const path = usePathname()
  const selectedKey = navItems.find(item => item.href === path)?.key ?? '1'
  
    return  <Menu
    theme="dark"
    mode="inline"

    selectedKeys={[selectedKey]}
    items={navItems.map(item => ({ 
      ...item, 
      label:  <Link href={item.href}>{item.label}</Link>,
       }))}
/>
}