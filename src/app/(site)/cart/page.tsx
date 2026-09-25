"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartDataType } from "@/core/net/types";
import { CartRequests } from "@/core/net/cart";
import { BlackActionBtn } from "@/components/blackActionBtn/blackActionBtn";
import { CartItem } from "./cartItem/cartItem";
import { OrdersRequests } from "@/core/net/orders";
import { AuthRequests } from "@/core/net/auth";
import { AuthModal } from "@/components/authModal/authModal";
import { useStore } from "@/core/store/store";
import { SimplifiedOrderModal } from "@/components/simplifiedOrderModal/simplifiedOrderModal";
import { FEATURES } from "@/core/config/flags";

export default function Cart() {
  const tempCart = useStore((state) => state.tempCart);
  const [isOpenAuthModal, setOpenAuthModal] = useState(false);
  const [isOpenSimplifiedModal, setOpenSimplifiedModal] = useState(false);

  const closeAuthModal = () => setOpenAuthModal(false);
  const closeSimplifiedModal = () => setOpenSimplifiedModal(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [cartData, setCartData] = useState<CartDataType | null>(null);

  const { data, isLoading } = useQuery<CartDataType>({
    queryKey: ["cartProducts", currentPage],
    queryFn: () => CartRequests.getCart(currentPage, 10),
    retry: false,
    enabled: !FEATURES.simplifiedOrderFlow,
  });

  const { data: tempCartData } = useQuery({
    queryKey: ["tempCartProducts", 1],
    queryFn: () => CartRequests.getTempCartByIds(1, 10, tempCart.productsData),
    retry: false,
    enabled: !!tempCart.productsData.length,
  });

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
    enabled: !FEATURES.simplifiedOrderFlow,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => OrdersRequests.createOrder(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts", 1] });
    },
  });

  const createOrderCallback = () => {
    if (FEATURES.simplifiedOrderFlow) {
      setOpenSimplifiedModal(true);
    } else if (!profileData) {
      setOpenAuthModal(true);
    } else {
      mutate();
    }
  };

  const getCartProducts = () => {
    if (FEATURES.simplifiedOrderFlow) {
      if (tempCart.productsData.length && tempCartData?.list.length) {
        return tempCartData;
      }
      return null;
    }

    if (data) {
      return data;
    } else if (tempCart.productsData.length && tempCartData?.list.length) {
      return tempCartData;
    }

    return null;
  };

  useEffect(() => {
    const data = getCartProducts();
    setCartData(data);
  }, [data, tempCartData, tempCart]);

  return (
    <div className={styles.container}>
      {isOpenAuthModal ? <AuthModal close={closeAuthModal} /> : <></>}
      {isOpenSimplifiedModal ? (
        <SimplifiedOrderModal close={closeSimplifiedModal} />
      ) : (
        <></>
      )}

      <div className={styles.list}>
        {cartData?.list.length ? (
          cartData?.list.map((cartProduct) => (
            <CartItem key={cartProduct.product.id} cartProduct={cartProduct} />
          ))
        ) : (
          <div className={styles.defaultText}>Корзина пуста</div>
        )}
      </div>
      <div className={styles.orderBlock}>
        {cartData?.totalPrice ? <div>Итоговая сумма товаров:</div> : <></>}
        <div className={styles.orderInfo}>
          {cartData?.totalPrice ? (
            <>
              <div className={styles.price}>
                {cartData?.totalPrice ?? 0} руб.
              </div>
              <BlackActionBtn
                callback={createOrderCallback}
                style={{
                  width: "min-content",
                  padding: "10px 15px",
                  whiteSpace: "nowrap",
                }}
                title="Оформить заказ"
                link=""
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
