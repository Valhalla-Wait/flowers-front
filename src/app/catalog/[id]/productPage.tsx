"use client";
import styles from "./productPage.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HeartOutlined } from "@ant-design/icons";
import { ChangeEvent, useState } from "react";
import Selector from "./selector/selector";
import { CustomBreadcrumb } from "./customBreadcrumb/customBreadcrumb";
import { ConsumableType } from "@/common/types";
import { Consumable } from "@/components/consumable/consumable";

const fetchData = async (id: string) => {
  const response = await axios.get(`http://localhost:8888/api/products/${id}`);
  const result = await response.data.data;

  return result;
};

export default function ProductPage({ id }: { id: string }) {
  const { data, isLoading } = useQuery<{
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

  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    const newValue = count - 1;
    if (newValue >= 0) setCount(count - 1);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 3 && Number.isInteger(Number(value))) {
      setCount(Number(event.target.value));
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
            {true ? (
              <div className={styles.discountPrice}>{`${6500} руб.`}</div>
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
              <div className={styles.count}>
                Кол-во:{" "}
                <Selector
                  count={count}
                  onChange={onChange}
                  increment={increment}
                  decrement={decrement}
                />
              </div>
              <div className={styles.estimatedPrice}>
                {count * (data?.price ?? 0)} руб.
              </div>
            </div>
            <div className={styles.actions}>
              <div className={styles.buy}>В корзину</div>
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
