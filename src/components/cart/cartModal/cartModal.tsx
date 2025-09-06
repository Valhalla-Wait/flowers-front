import styles from "./cartModal.module.css";
import { MutableRefObject } from "react";
import { BlackActionBtn } from "@/components/blackActionBtn/blackActionBtn";
import { CartDataType } from "@/core/net/types";
import { CloseBtn } from "@/components/closeBtn/closeBtn";
import { CartModalList } from "./cartModalList/cartModalList";

type PropsType = {
  productsData: CartDataType | null;
  isOpen: boolean;
  close: () => void;
  outsideAlertRef: MutableRefObject<null>;
};

export const CartModal = ({
  productsData,
  isOpen,
  close,
  outsideAlertRef,
}: PropsType) => {
  // TODO: Добавить Loader
  return (
    <div
      ref={outsideAlertRef}
      className={`${styles.container} ${isOpen ? styles.visible : ""}`}
    >
      <div className={styles.closeBtnContainer}>
        <CloseBtn callback={close} />
      </div>
      <div className={styles.cartInfo}>
        <CartModalList productsData={productsData ?? null} />
        <div className={styles.total}>
          Итог: {productsData?.totalPrice ?? 0} руб.
        </div>
        <div className={styles.actions}>
          <BlackActionBtn
            style={{
              padding: "10px 15px",
              fontSize: "14px",
            }}
            title="Перейти в корзину"
            link="/cart"
          />
        </div>
      </div>
    </div>
  );
};
