"use client";
import { Select } from "antd";

export type OrderSortValue = "asc" | "desc";

type PropsType = {
  value: OrderSortValue;
  onChange: (value: OrderSortValue) => void;
};

const sortOptions = [
  { value: "desc", label: "Сначала новые" },
  { value: "asc", label: "Сначала старые" },
];

export const OrderSort = ({ value, onChange }: PropsType) => {
  return (
    <Select
      placeholder="Сортировать по дате"
      style={{ width: 200 }}
      allowClear
      value={value}
      onChange={(nextValue) => onChange(nextValue ?? null)}
      options={sortOptions}
    />
  );
};
