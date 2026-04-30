"use client";
import { Collapse, Space, Typography, Tag, Select } from "antd";
import { OrderItemType, OrderStatus } from "@/core/net/orders";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Panel } = Collapse;
const { Text } = Typography;

type OrderCardProps = {
  order: OrderItemType;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
};

const orderStatusTitle: Record<string, string> = {
  completed: "Выполнен",
  in_process: "В обработке",
  in_work: "Принят в работу",
  delivery: "Доставка",
  canceled: "Отменен",
};

export const OrderCard = ({ order, onStatusChange }: OrderCardProps) => {
  const handleStatusChange = (newStatus: OrderStatus) => {
    onStatusChange(order.id, newStatus);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Дата
        </Text>
        <div>{dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flex: "1 1 auto",
          minWidth: 300,
        }}
      >
        <div style={{ textAlign: "center", flex: "1 1 80px" }}>
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Телефон:
            </Text>
          </div>
          <div>{order.phone}</div>
        </div>
        <div style={{ textAlign: "center", flex: "1 1 100px" }}>
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Общая стоимость:
            </Text>
          </div>
          <div>{order.totalPrice} руб.</div>
        </div>
        <div style={{ textAlign: "center", flex: "1 1 80px" }}>
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Товаров в заказе:
            </Text>
          </div>
          <div>{order.products.length}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Select
          value={order.status}
          onChange={handleStatusChange}
          style={{ width: 150 }}
          options={[
            { value: "in_process", label: "В обработке" },
            { value: "in_work", label: "Принят в работу" },
            { value: "delivery", label: "Доставка" },
            { value: "completed", label: "Выполнен" },
            { value: "canceled", label: "Отменен" },
          ]}
          onClick={stopPropagation}
        />
      </div>
    </div>
  );

  return (
    <Collapse
      style={{ width: "100%" }}
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} />
      )}
    >
      <Panel header={header} key={order.id}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {order.products.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom:
                    index !== order.products.length - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                }}
              >
                <div>
                  <Text strong>{item.product.title}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Цена: {item.product.price} × {item.count}
                  </Text>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Text strong>{item.productTotalPrice} руб.</Text>
                </div>
              </div>
            ))}
          </div>
        </Space>
      </Panel>
    </Collapse>
  );
};
