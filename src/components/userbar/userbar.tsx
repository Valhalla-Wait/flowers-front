"use client"
import { MenuOutlined, SearchOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./userbar.module.css";
import { Cart } from "../cart/cart";

export const Userbar = ({toggleCollapsedMobileMenu}: {
    toggleCollapsedMobileMenu: () => void
}) => {

    return <div className={styles.userbar}>
        <div className={styles.collapsedItem}><SearchOutlined className={styles.icon} /></div>
        <div className={styles.collapsedItem}><UserOutlined className={styles.icon} /></div>
        <Cart productsCount={3}/>
        <div onClick={toggleCollapsedMobileMenu} className={styles.collapsedMenu}><MenuOutlined className={styles.icon}/></div>
    </div>
}