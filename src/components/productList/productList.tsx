import { List } from "antd";
import {
  ProductListCard,
  ProductListCardType,
} from "./productListCard/productListCard";
import { Content } from "antd/es/layout/layout";
import { Pagination } from "./pagination/pagination";

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
          xxl: 4,
        }}
        dataSource={list}
        renderItem={(product) => (
          <List.Item>
            <ProductListCard key={product.id} {...product} />
          </List.Item>
        )}
      />
      <Pagination {...pagination} />
    </Content>
  );
};
