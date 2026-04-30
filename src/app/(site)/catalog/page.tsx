"use client";
import { ProductList } from "@/components/productList/productList";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { ProductListCardType } from "@/components/productList/productListCard/productListCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartRequests } from "@/core/net/cart";
import { CartDataType } from "@/core/net/types";
import { useStore } from "@/core/store/store";
import { makeRequest } from "@/utils/makeRequest";
import axios from "axios";

const fetchData = async (currentPage: number, pageSize: number) => {
  const response = await fetch(
    `http://localhost:8888/api/products?page=${currentPage}&limit=${pageSize}`
  );
  const result = await response.json();

  return { list: result.list, meta: result.meta };
};

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogProducts, setCatalogProducts] = useState<{
    list: ProductListCardType[];
    meta: Record<string, number>;
  } | null>(null);

  const productsData = useStore((store) => store.tempCart.productsData);

  const { data: products, isLoading } = useQuery<{
    list: ProductListCardType[];
    meta: Record<string, number>;
  }>({
    queryKey: ["products"],
    queryFn: () => fetchData(currentPage, 10),
  });

  const { data: cart, isLoading: isCartLoading } = useQuery<CartDataType>({
    queryKey: ["cartProducts", currentPage, 20],
    queryFn: () => CartRequests.getCart(currentPage, 20),
    retry: false,
  });

  const queryClient = useQueryClient();
  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      axios.get("http://51.250.83.228:7136/api/content-managers", {
        withCredentials: true,
      }),
    retry: false,
  });

  console.log("ADMINS", admins);

  const { mutate } = useMutation({
    mutationFn: () =>
      makeRequest({
        method: "post",
        url: "auth",
        data: {
          login: "admin",
          password: "123456",
        },
      }),
    onSuccess: async (data) => {
      console.log("AUTH", data);
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      // const admins = await makeRequest({
      //   method: "get",
      //   url: "content-managers",
      // });
      // console.log("ADMINS", admins);
    },
    retry: false,
  });

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (products) {
      if (cart) {
        const preparedProducts = products.list.map((product) => ({
          ...product,
          inCartCount: cart.list.filter(
            (cartProduct) => cartProduct.product.id === product.id
          ).length,
        }));

        setCatalogProducts({
          ...products,
          list: preparedProducts,
        });
      } else if (productsData) {
        const preparedProducts = products.list.map((product) => ({
          ...product,
          inCartCount: productsData.filter(
            (cartProduct) => cartProduct.id === product.id
          ).length,
        }));

        setCatalogProducts({
          ...products,
          list: preparedProducts,
        });
      } else {
        setCatalogProducts(products);
      }
    }
  }, [isCartLoading, isLoading, productsData]);

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
        total={catalogProducts?.meta.pages ?? 0}
        list={catalogProducts?.list ?? []}
      />
    </div>
  );
}
