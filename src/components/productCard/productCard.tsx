"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";

export default function ProductCard({
  id,
  title,
  price,
  photo,
  isAvailable,
}: {
  id: string;
  title: string;
  price: number;
  photo: string;
  isAvailable: boolean;
}) {
  const [inStock, setInStock] = useState(isAvailable);

  const toggleAvailable = async () => {
    try {
      await fetch(`http://localhost:8888/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: inStock }),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: () => toggleAvailable(),
    onSuccess: () => setInStock(() => !inStock),
  });

  return (
    <Card hoverable cover={<img alt="example" src={photo} />}>
      <div
        style={{
          display: "grid",
          rowGap: "25px",
        }}
      >
        <Meta
          style={{ fontSize: "16px" }}
          description={`${price} руб.`}
          title={title}
        />
        <div
          style={{
            display: "grid",
            justifyItems: "start",
            rowGap: "5px",
          }}
        >
          <Meta description="Есть в наличии?" />
          <Switch
            defaultChecked
            onChange={() => mutation.mutate()}
            loading={mutation.isPending}
            checked={inStock}
          />
        </div>
      </div>
    </Card>
  );
}
