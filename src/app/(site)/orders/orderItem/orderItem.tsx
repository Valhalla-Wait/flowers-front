import { useState } from "react";
import styles from "./orderItem.module.css";
import { OrderItemType, OrderStatus } from "@/core/net/orders";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { CustomLink } from "@/components/customLink/customLink";

type PropsType = {
  order: OrderItemType;
};

const orderStatusTitle: Record<OrderStatus, string> = {
  completed: "Выполнен",
  in_process: "В обработке",
  in_work: "Принят в работу",
  delivery: "Доставка",
  canceled: "Отменен",
};

export const OrderItem = ({ order }: PropsType) => {
  const [isOpenDetails, setOpenDetail] = useState(false);

  const toggleOpenDetail = () => setOpenDetail(!isOpenDetails);

  // TODO: Сделать через таблицы
  return (
    <div onClick={toggleOpenDetail} className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>
          {isOpenDetails ? <DownOutlined /> : <RightOutlined />}
          <p>Кол-во товаров: {order.products.length}</p>
        </div>
        <div className={styles.date}>
          {dayjs(order.createdAt).format("DD/MM/YY - hh:mm")}
        </div>
        <div className={styles.totalPrice}>{order.totalPrice} руб.</div>
        <div className={styles.status}>{orderStatusTitle[order.status]}</div>
      </div>

      <div className={styles.mobileInfo}>
        <div className={styles.mobileTitle}>
          Кол-во товаров: {order.products.length}
        </div>
        <table cellSpacing={0} className={styles.mobileInfoTable}>
          <tbody>
            <tr>
              <th className={styles.tableHeader}>Дата - время</th>
              <th>{dayjs(order.createdAt).format("DD/MM/YY - hh:mm")}</th>
            </tr>
            <tr>
              <th className={styles.tableHeader}>Сумма заказа</th>
              <th>{order.totalPrice} руб.</th>
            </tr>
            <tr>
              <th className={styles.tableHeader}>Статус</th>
              <th>{orderStatusTitle[order.status]}</th>
            </tr>
          </tbody>
        </table>
        <div className={styles.mobileAction}>
          {isOpenDetails ? (
              <DownOutlined />
          ) : (
              <RightOutlined />
          )}{" "}
          Детали
        </div>
      </div>

      {isOpenDetails ? (
        <div className={styles.detail}>
          <div className={styles.detailHeader}>
            {/* <div className={styles.detailItemPhoto}>Фото</div> */}
            <div className={styles.detailItemTitle}>Название</div>
            <div className={styles.detailItemPrice}>Цена</div>
            <div className={styles.detailItemCount}>Кол-во</div>
            <div className={styles.detailItemTotalPrice}>Итог</div>
          </div>
          {order.products.map(({ product, count, productTotalPrice }) => (
            <div className={styles.detailItem} key={product.id}>
              {/* <SmallImg notInStock={!product.inStock} src={product.photo} /> */}
              <div className={styles.detailItemTitle}>
                <CustomLink href={`/catalog/${product.id}`}>
                  {product.title}
                </CustomLink>
              </div>
              <div className={styles.detailItemPrice}>{product.price} руб.</div>
              <div className={styles.detailItemCount}>x{count}</div>
              <div className={styles.detailItemTotalPrice}>
                {productTotalPrice} руб.
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
