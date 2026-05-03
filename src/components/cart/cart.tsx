"use client"
import { ShoppingOutlined } from "@ant-design/icons";
import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import { CartModal } from "./cartModal/cartModal";
import { useOutsideAlerter } from "@/hooks/useOutsideAlerter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CartRequests } from "@/core/net/cart";
import { useStore } from "@/core/store/store";

const pageSize = 10;

export const Cart = () => {
  const tempCart = useStore((state) => state.tempCart);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cartProducts", 1],
    queryFn: () => CartRequests.getCart(1, pageSize),
    retry: false,
  });

  const { data: tempCartData, refetch } = useQuery({
    queryKey: ["tempCartProducts", 1],
    queryFn: () =>
      CartRequests.getTempCartByIds(1, pageSize, tempCart.productsData),
    // TODO: может по дефолту при ините отключить retry
    retry: false,
  });

  const [isOpen, setOpen] = useState(false);

  const toggleOpenCartModal = () => setOpen(() => !isOpen);
  const closeCartModal = () => setOpen(() => false);

  const outsideAlertRef = useOutsideAlerter(closeCartModal);

  const getCartCount = () => {
    if (data && Number.isInteger(data?.meta.total)) {
      return data.meta.total;
    } else if (tempCart.productsData.length) {
      return tempCart.productsData.length;
    } else {
      return 0;
    }
  };

  const getCartProducts = () => {
    if (data) {
      return data;
    } else if (tempCart.productsData.length && tempCartData?.list.length) {
      return tempCartData;
    }

    return null;
  };

  useEffect(() => {
    // TODO: Рефакторинг, есть наверно более нативные методы для перезапроса данных минуя кэш
    queryClient.removeQueries({
      queryKey: ["tempCartProducts", 1],
    });
    refetch();
  }, [tempCart]);

  return (
    <>
      <div
        ref={outsideAlertRef}
        className={styles.cart}
        onClick={toggleOpenCartModal}
      >
        <ShoppingOutlined className={styles.icon} />
       {getCartCount() ? <div className={styles.productCounter}>{getCartCount()}</div> : <></>}
      </div>
      <CartModal
        productsData={getCartProducts()}
        outsideAlertRef={outsideAlertRef}
        close={toggleOpenCartModal}
        isOpen={isOpen}
      />
    </>
  );
};
