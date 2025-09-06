import Link from "next/link";
import styles from "./cartModalItem.module.css";
import { CartItemType } from "@/core/net/types";
import { SmallImg } from "@/components/smallImg/smallImg";

export const CartModalItem = ({
  product,
  count,
  productTotalPrice,
}: CartItemType) => {
  return (
    <div className={styles.container}>
      <Link href={`/catalog/${product.id}`}>
        <SmallImg notInStock={!product.inStock} src={product.photo} />
      </Link>
      <div className={styles.info}>
        <Link href={`/catalog/${product.id}`}>
          <div className={styles.title}>{product.title}</div>
        </Link>
        <div className={styles.detail}>
          <div>х{count}</div>
          <div>{productTotalPrice} руб.</div>
        </div>
      </div>
    </div>
  );
};
