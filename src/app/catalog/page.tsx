"use client";
import { ProductList } from "@/components/productList/productList";
import styles from "./page.module.css";
import { useState } from "react";
import { ProductListCardType } from "@/components/productList/productListCard/productListCard";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (currentPage: number, pageSize: number) => {
  const response = await fetch(
    `http://localhost:8888/api/products?page=${currentPage}&limit=${pageSize}`
  );
  const result = await response.json();

  return { list: result.list, meta: result.meta };
};

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading } = useQuery<{
    list: ProductListCardType[];
    meta: Record<string, number>;
  }>({
    queryKey: ["products", currentPage],
    queryFn: () => fetchData(currentPage, 10),
  });

  return (
    <div className={styles.container}>
      {/* <div className={styles.saleBanner}></div> */}
      {/* <div className={styles.header}>
            <div className={styles.sort}>Сортировка</div>
            <div className={styles.filter}>Фильтры</div>
        </div> */}
      <ProductList
        currentPage={currentPage}
        onChange={setCurrentPage}
        total={products?.meta.pages ?? 0}
        list={products?.list ?? []}
      />
    </div>
  );
}
