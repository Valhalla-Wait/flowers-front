"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrderItem } from "./orderItem/orderItem";
import { OrdersRequests } from "@/core/net/orders";
import { useStore } from "@/core/store/store";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () => OrdersRequests.getOrders(currentPage, 10),
  });

  // const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: () => OrdersRequests.createOrder(),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cartProducts", 1] });
  //   },
  // });

  // const createOrderCallback = () => mutate();

  // TODO: сделать через таблиц
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
    </div>
  );
}
