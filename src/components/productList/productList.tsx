import { List } from "antd";
import {
  ProductListCard,
  ProductListCardType,
} from "./productListCard/productListCard";
import { Content } from "antd/es/layout/layout";
import { Pagination } from "./pagination/pagination";
import Link from "next/link";
import { CustomLink } from "../customLink/customLink";

export const ProductList = ({
  list,
  ...pagination
}: {
  onChange: (pageNumber: number) => void;
  total: number;
  currentPage: number;
  list: ProductListCardType[];
}) => {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: "0 24px",
      }}
    >
      <List
        grid={{
          gutter: 30,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 1,
        }}
        dataSource={list}
        renderItem={(product) => (
          <List.Item>
            <CustomLink href={`/catalog/${product.id}`}>
              <ProductListCard key={product.id} {...product} />
            </CustomLink>
          </List.Item>
        )}
      />
      <Pagination {...pagination} />
    </Content>
  );
};
