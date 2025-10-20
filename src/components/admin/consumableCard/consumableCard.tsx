"use client";
import { Card, InputNumber, Popconfirm, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { DeleteOutlined } from "@ant-design/icons";
import { CountSelector } from "../../countSelector/countSelector";

export default function ConsumableCard({
  id,
  title,
  count,
  startEdit,
  setCount,
  onDelete,
}: {
  id: string;
  title: string;
  count: number;
  startEdit: () => void;
  setCount: (count: number) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card
      onClick={startEdit}
      hoverable
      style={{
        minWidth: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Meta style={{ fontSize: "16px" }} title={title} />
        <div
          style={{
            display: "flex",
            justifyItems: "start",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Meta
            description="Кол-во"
            style={{
              fontSize: 18,
            }}
          />
          <CountSelector
            withDescription={false}
            count={count}
            setCount={setCount}
          />
          <Popconfirm
            title="Удалить расходник?"
            description="Вы уверены, что хотите удалить этот расходник?"
            onConfirm={() => onDelete(id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              style={{
                fontSize: "21px",
              }}
            />
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
}
