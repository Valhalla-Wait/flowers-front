import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import Nav from "@/components/nav/nav";
import React from "react";


export default function AdminPageLayout({children}: {children: React.ReactNode}) {
    return (
      <Layout hasSider={true} className="layout" style={{'minHeight': '100vh'}}>
          <Sider>
            <div className="logo" />
             <Nav />
          </Sider>
          <Layout className="site-layout">
           {children}
          </Layout>
    </Layout>)
  }