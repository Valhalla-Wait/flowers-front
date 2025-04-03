import { ShoppingOutlined } from "@ant-design/icons";
import styles from "./cart.module.css";


export const Cart = ({productsCount}: {
    productsCount: number
}) => {
    return <div className={styles.cart}>
        <ShoppingOutlined className={styles.icon} />
        <div className={styles.productsIndicator}>
            {productsCount}
        </div>
    </div>
}