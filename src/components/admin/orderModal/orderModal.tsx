"use client";
import { Select, InputNumber, Form, Input } from "antd";
import { FormFieldType } from "../itemModalContainer/itemModalForm";
import { OrderStatus } from "@/core/net/orders";

export const orderStatusOptions = [
  { label: "В обработке", value: OrderStatus.IN_PROCESS },
  { label: "Принят в работу", value: OrderStatus.IN_WORK },
  { label: "Доставка", value: OrderStatus.DELIVERY },
  { label: "Выполнен", value: OrderStatus.COMPLETED },
  { label: "Отменен", value: OrderStatus.CANCELED },
];

export const orderFormFields: FormFieldType[] = [
  {
    formProps: {
      label: "Статус заказа",
      name: "status",
      rules: [{ required: true, message: "Необходимо указать статус заказа" }],
    },
    children: <Select options={orderStatusOptions} />,
  },
  {
    formProps: {
      label: "Телефон",
      name: "phone",
      rules: [
        { required: true, message: "Необходимо указать телефон" },
        { pattern: /^\+7\d{10}$/, message: "Неверный формат телефона" },
      ],
    },
    children: <Input placeholder="+7XXXXXXXXXX" />,
  },
  {
    formProps: {
      label: "Общая стоимость",
      name: "totalPrice",
      rules: [
        {
          required: true,
          message: "Необходимо указать общую стоимость",
          type: "number",
          min: 0,
        },
      ],
    },
    children: <InputNumber style={{ width: "100%" }} />,
  },
];
