import { CartItemType } from "@/core/net/types";
import styles from "./cartItem.module.css";
import { CloseBtn } from "@/components/closeBtn/closeBtn";
import { CountSelector } from "@/components/countSelector/countSelector";
import { useCart } from "@/hooks/useCart";

type PropsType = {
  cartProduct: CartItemType;
};

export const CartItem = ({ cartProduct }: PropsType) => {
  const { updateProductCount, removeProduct } = useCart({
    productId: cartProduct.product.id,
    price: cartProduct.product.price,
    count: cartProduct.count,
  });

  return (
    <>
      <div key={cartProduct.product.id} className={styles.container}>
        <img className={styles.photo} src={cartProduct.product.photo} alt="" />
        <div className={styles.title}>{cartProduct.product.title}</div>
        <div className={styles.price}>{cartProduct.product.price} руб.</div>
        <CountSelector
          count={cartProduct.count}
          setCount={updateProductCount}
          withDescription={false}
        />
        <div className={styles.price}>{cartProduct.productTotalPrice} руб.</div>
        <CloseBtn callback={removeProduct} />
      </div>
      <div className={styles.line} />
    </>
  );
};
