"use client";
import styles from "./productPage.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HeartOutlined } from "@ant-design/icons";
import { CustomBreadcrumb } from "./customBreadcrumb/customBreadcrumb";
import { ConsumableType } from "@/common/types";
import { Consumable } from "@/components/consumable/consumable";
import { BlackActionBtn } from "@/components/blackActionBtn/blackActionBtn";
import { CountSelector } from "@/components/countSelector/countSelector";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";

const fetchData = async (id: string) => {
  const response = await axios.get(`http://localhost:8888/api/products/${id}`);
  const result = await response.data.data;

  return result;
};

// TODO: Рефакторинг логики добавления в корзину, сейчас очень костыльно

export default function ProductPage({ id }: { id: string }) {
  // TODO: Сделать обработку ошибок на уровне запросов
  const { data } = useQuery<{
    id: string;
    title: string;
    price: number;
    priceWithoutDiscount?: number;
    photo: string;
    consumables: ConsumableType[];
    isAvailable: boolean;
  }>({
    queryKey: ["product", id],
    queryFn: () => fetchData(id as string),
  });

  const [productCount, setProductCount] = useState(0);

  const { updateProductCount, addProduct, getCartProductById } = useCart({
    productId: id,
    price: data?.price,
    count: productCount,
  });

  const productFromCart = getCartProductById(id);

  useEffect(() => {
    if (productFromCart?.count) {
      setProductCount(productFromCart?.count);
    }
  }, [productFromCart?.count]);

  const customUpdateProductCount = (count: number) => {
    if (!productFromCart && count != 0) {
      addProduct();
    } else {
      updateProductCount(count);
    }
  };

  return (
    <div className={styles.container}>
      <CustomBreadcrumb productName={data?.title ?? ""} />
      <div className={styles.product}>
        <img className={styles.photo} src={data?.photo} alt="" />
        <div className={styles.info}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.price}>
            {`${data?.price} руб.`}
            {data?.priceWithoutDiscount ? (
              <div
                className={styles.discountPrice}
              >{`${data?.priceWithoutDiscount} руб.`}</div>
            ) : (
              ""
            )}
          </div>
          {data?.consumables.length ? (
            <div className={styles.consumables}>
              Состав:
              {data?.consumables.map((consumable) => (
                <Consumable key={consumable.id} title={consumable.title} />
              ))}
            </div>
          ) : (
            <></>
          )}
          <div className={styles.border}></div>
          <div className={styles.orderInfo}>
            <div className={styles.orderPrice}>
              <CountSelector
                count={productFromCart?.count ?? 0}
                setCount={customUpdateProductCount}
              />
              <div className={styles.estimatedPrice}>
                {(productFromCart?.count ?? 0) *
                  (productFromCart?.product.price ?? 0)}{" "}
                руб.
              </div>
            </div>
            <div className={styles.actions}>
              <BlackActionBtn
                style={{
                  padding: "13px 30px",
                  fontSize: "24px",
                }}
                callback={() => customUpdateProductCount(productCount + 1)}
                link=""
                title="В корзину"
              />
              <div className={styles.like}>
                <HeartOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
