"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "./orderItem/orderItem";
import { OrdersRequests } from "@/core/net/orders";
import { Pagination } from "@/components/productList/pagination/pagination";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () => OrdersRequests.getOrders({
      currentPage,
      pageSize: 10
    }),
  });

  // TODO: сделать через таблицу
  // TODO: Добавить заголовки для таблицы
  return (
    <div className={styles.container}>
      {/* <div className={styles.banner}>
        <div>Shopping Cart</div>
      </div> */}

      <div className={styles.list}>
        {data?.list.length ? (
          data?.list.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <div className={styles.defaultText}>Заказов нет</div>
        )}
      </div>
      <Pagination currentPage={currentPage}
        onChange={setCurrentPage}
        total={data?.meta.pages ?? 0} />
    </div>
  );
}
