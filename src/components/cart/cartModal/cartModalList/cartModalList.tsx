import Link from "next/link";
import { CartModalItem } from "../cartModalItem/cartModalItem";
import styles from "./cartModalList.module.css";
import { CartDataType } from "@/core/net/types";

type PropsType = {
  productsData: CartDataType | null;
};

export const CartModalList = ({ productsData }: PropsType) => {
  return (
    <div className={styles.list}>
      {productsData?.list.length ? (
        productsData.list
          .slice(0, 3)
          .map((el, index) => <CartModalItem key={index} {...el} />)
      ) : (
        <div className={styles.defaultText}>Корзина пуста</div>
      )}
      {productsData?.meta.total ? (
        productsData?.meta.total > 3 ? (
          <Link className={styles.defaultText} href={"/cart"}>
            Еще {productsData.meta.total - 3} товар(-ов)
          </Link>
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};
