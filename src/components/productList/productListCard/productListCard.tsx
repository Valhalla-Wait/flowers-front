import styles from "./productListCard.module.css";
import Link from "next/link";
import { CustomLink } from "@/components/customLink/customLink";
import { CountSelector } from "@/components/countSelector/countSelector";
import { useCart } from "@/hooks/useCart";

export type ProductListCardType = {
  id: string;
  title: string;
  price: number;
  photo: string;
  priceWithoutDiscount?: number;
  isHot?: boolean;
  inCartCount?: number;
};

export const ProductListCard = ({
  id,
  title,
  price,
  photo,
  priceWithoutDiscount,
  isHot,
  inCartCount,
}: ProductListCardType) => {
  // TODO: Сделать элемент img в Item

  // TODO: Рефакторинг: брать либо сверху из списка, либо из хука
  const { updateProductCount, addProduct, getCartProductById } = useCart({
    productId: id,
    price,
    count: inCartCount ?? 0,
  });

  const cartProduct = getCartProductById(id);

  return (
    <div className={styles.container}>
      <Link href={`/catalog/${id}`}>
        <div className={styles.imgContainer}>
          {isHot || priceWithoutDiscount ? (
            <div className={styles.status}>
              {isHot ? "Популярное" : ""}{" "}
              {Number(priceWithoutDiscount) ? "Распродажа" : ""}
            </div>
          ) : (
            ""
          )}
          <img className={styles.photo} alt="example" src={photo} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.productInfo}>
          <CustomLink href={`/catalog/${id}`}>
            <div className={styles.title}>{title}</div>
          </CustomLink>
          <div className={styles.price}>
            {`${price} р.`}{" "}
            {Number(priceWithoutDiscount) ? (
              <div
                className={styles.discountPrice}
              >{`${priceWithoutDiscount} р.`}</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.actions}>
          {cartProduct?.count ? (
            <CountSelector
              withDescription={false}
              count={cartProduct?.count}
              setCount={updateProductCount}
            />
          ) : (
            <button onClick={addProduct} className={styles.buyBtn}>
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
