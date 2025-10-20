"use client";
import { ProductsRequests } from "@/core/net/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Switch, Button, message, Popconfirm } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

export default function ProductCard({
  id,
  title,
  price,
  photo,
  startEdit,
  isAvailable,
}: {
  id: string;
  title: string;
  price: number;
  photo: string;
  startEdit: () => void;
  isAvailable?: boolean;
}) {
  const [inStock, setInStock] = useState(isAvailable);

  const mutation = useMutation({
    mutationFn: () => ProductsRequests.update({ id, isAvailable: !inStock }),
    onSuccess: () => setInStock(() => !inStock),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => ProductsRequests.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      message.success("Товар успешно удален");
    },
  });

  return (
    /* TODO: Чекнуть что писать в alt */
    <Card
      hoverable
      onClick={startEdit}
      cover={<img alt="example" src={photo} />}
    >
      <div
        style={{
          display: "grid",
          rowGap: "25px",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <Meta
            style={{
              fontSize: "16px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            description={`${price} руб.`}
            title={title}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Meta description="Есть в наличии?" />
            <Switch
              defaultChecked
              onChange={(_, event) => {
                event.preventDefault();
                event.stopPropagation();
                mutation.mutate();
              }}
              loading={mutation.isPending}
              checked={inStock}
            />
          </div>
          <Popconfirm
            title="Удалить товар"
            description="Вы уверены, что хотите удалить этот товар?"
            onConfirm={(event) => {
              event?.preventDefault();
              event?.stopPropagation();
              deleteMutation.mutate();
            }}
            onCancel={(event) => {
              event?.preventDefault();
              event?.stopPropagation();
            }}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              loading={deleteMutation.isPending}
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
