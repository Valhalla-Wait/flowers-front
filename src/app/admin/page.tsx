"use client";
import ProductCard from "@/components/productCard/productCard";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { List } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Link from "next/link";
import { useState } from "react";

const pageSize = 8;

const fetchData = async (currentPage: number, pageSize: number) => {
  const response = await fetch(
    `http://localhost:8888/api/products?page=${currentPage}&limit=${pageSize}`
  );
  const result = await response.json();

  return { list: result.list, meta: result.meta };
};

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading } = useQuery<{
    list: any[];
    meta: Record<string, number>;
  }>({
    queryKey: ["products", currentPage],
    queryFn: () => fetchData(currentPage, pageSize),
  });

  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 0,
          color: "white",
        }}
      >
        <div>PRODUCTS PAGE</div>
        <Link href="/admin/create-product">
          <PlusOutlined />
        </Link>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
        }}
      >
        {
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 1,
            }}
            pagination={{
              onChange: (page) => setCurrentPage(page),
              pageSize,
              position: "bottom",
              align: "center",
              total: products?.meta.total,
            }}
            dataSource={products?.list}
            loading={isLoading}
            renderItem={(productData) => (
              <List.Item>
                {/* <Card
          hoverable
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          <Meta description={`Цена: ${price} руб.`} title={title}  />
        </Card> */}
                <ProductCard {...productData} />
              </List.Item>
            )}
          />
        }
      </Content>
    </>
  );
}
