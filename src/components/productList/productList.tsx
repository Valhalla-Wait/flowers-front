import { List } from "antd";
import { ProductListCard, ProductListCardType } from "./productListCard/productListCard";
import { Content } from "antd/es/layout/layout";


export const ProductList = ({list}: {
    list: ProductListCardType[]
    }
) => {
    // return <div className={styles.container}>
    //     {list.map(product => <ProductListCard key={product.id} {...product} />)}
    // </div>

    return <Content
    className="site-layout-background"
    style={{
    //   margin: '24px 16px',
      padding: "0 24px",
    }}
    >
        <List
            grid={{
            gutter: 30,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 1,
            }}
            dataSource={list}
            renderItem={product => <List.Item><ProductListCard key={product.id} {...product} /></List.Item>}
        />
    </Content>
}