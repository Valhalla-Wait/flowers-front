"use client";
import { useQuery } from "@tanstack/react-query";
import { Content, Header } from "antd/es/layout/layout";

const fetchData = async () => {
  const response = await fetch('http://localhost:8888/api/products');
  const result = await response.json();
  return result.list
};

export default function ConsumablesPage() {
  const { data: products, isLoading, isError } = useQuery<any[]>({
    queryKey: ['products'],
    queryFn: () => fetchData(),
  })


  if (isError) {
    return <div>Error</div>
  }

  return (
    <>
        <Header
            className="site-layout-background"
            style={{
              padding: 0,
              color: 'white',
            }}
        >
<div>Consumables PAGE</div>
        </Header>
        <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
        >
            <div>
      {isLoading ? 
  <div>Loading...</div> 
  : 
   products?.map((item) => <div key={item.id}>
    <div>{item.title}</div>
    <div>{item.price}</div>
   </div>
   )}
    </div>
        </Content>
    </>
  )
  }