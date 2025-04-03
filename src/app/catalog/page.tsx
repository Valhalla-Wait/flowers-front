"use client"
import { ProductList } from "@/components/productList/productList";
import styles from "./page.module.css";
import { useState } from "react";
import { ProductListCardType } from "@/components/productList/productListCard/productListCard";

export default function Catalog() {
    const [products] = useState<ProductListCardType[]>([
        {
            id: '1',
            title: "Букет роз",
            price: 1200,
            photo: '123dasflkdf',
            isHot: true
        },
        {
            id: '2',
            title: "Букет лилий",
            price: 1600,
            photo: '123dasflkdf'
        },
        {
            id: '3',
            title: "Букет гвоздик",
            price: 700,
            priceWithoutDiscount: 1500,
            photo: '123dasflkdf',
        },
        {
            id: '4',
            title: "Букет тюльпанов",
            price: 12000,
            photo: '123dasflkdf'
        }
    ])

    return <div className={styles.container}>
        {/* <div className={styles.sales}></div> */}
        {/* <div className={styles.header}>
            <div className={styles.sort}>Сортировка</div>
            <div className={styles.filter}>Фильтры</div>
        </div> */}
        <ProductList list={products}/>
        {/* <div className={styles.list}>Пагинация</div> */}
    </div>
}