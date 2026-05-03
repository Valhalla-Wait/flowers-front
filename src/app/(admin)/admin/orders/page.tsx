"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { OrdersRequests, OrderItemType, OrderStatus } from "@/core/net/orders";
import { AdminDefaultPageLayout } from "@/components/admin/adminPageLayout/adminPageLayout";
import { List, message, Space, Pagination, Select } from "antd";
import { ItemModalContainer } from "@/components/admin/itemModalContainer/itemModalContainer";
import { orderFormFields } from "@/components/admin/orderModal/orderModal";
import { OrderCard } from "@/components/admin/orderCard/orderCard";

const pageSize = 10;

export type EditOrderType = {
  id: string;
  status: string;
  phone: string;
  totalPrice: number;
  products: any[];
} | null;

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editOrder, setEditOrder] = useState<EditOrderType>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const openModal = () => setOpenModal(true);
  const closeModal = () => {
    setOpenModal(false);
    setEditOrder(null);
  };
  const openEditModal = (order: OrderItemType) => {
    openModal();
    setEditOrder(order);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    OrdersRequests.updateOrderStatus(orderId, { status: newStatus })
      .then((updatedOrder) => {
        queryClient.setQueryData(
          ["admin-orders", currentPage, statusFilter],
          (oldData: any) => {
            if (!oldData) return oldData;
            const updatedList = oldData.list.map((item: any) =>
              item.id === updatedOrder.id ? { ...item, ...updatedOrder } : item
            );
            return {
              ...oldData,
              list: updatedList,
            };
          }
        );
        messageApi.open({
          type: "success",
          content: "Статус заказа успешно обновлен",
        });
      })
      .catch((err) => {
        console.log(err);
        messageApi.open({
          type: "error",
          content: "Не удалось обновить статус заказа",
        });
      });
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders", currentPage, statusFilter],
    queryFn: () =>
      OrdersRequests.getOrders({
        currentPage,
        pageSize,
        status: statusFilter as OrderStatus,
      }),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ id, status, phone, totalPrice }: any) => {
      return OrdersRequests.updateOrder(id, { status, phone, totalPrice });
    },
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(
        ["admin-orders", currentPage, statusFilter],
        (oldData: any) => {
          if (!oldData) return oldData;
          const updatedList = oldData.list.map((item: any) =>
            item.id === updatedOrder.id ? { ...item, ...updatedOrder } : item
          );
          return {
            ...oldData,
            list: updatedList,
          };
        }
      );
      messageApi.open({
        type: "success",
        content: `Заказ успешно ${editOrder ? "изменен" : "создан"}`,
      });
      closeModal();
    },
    onError: (err) => {
      console.log(err);
      messageApi.open({
        type: "error",
        content: `Не удалось ${editOrder ? "изменить" : "создать"} заказ`,
      });
    },
  });

  return (
    <>
      {contextHolder}
      <AdminDefaultPageLayout
        title="Заказы"
        openModal={() => {}} // No-op function since orders don't have an "add" functionality
        children={
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "flex-end" }}
            >
              <Select
                placeholder="Фильтр по статусу"
                style={{ width: 200 }}
                allowClear
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1); // Reset to first page when filter changes
                }}
                options={[
                  { value: "in_process", label: "В обработке" },
                  { value: "in_work", label: "Принят в работу" },
                  { value: "delivery", label: "Доставка" },
                  { value: "completed", label: "Выполнен" },
                  { value: "canceled", label: "Отменен" },
                ]}
              />
            </Space>
            <List
              loading={isLoading}
              dataSource={orders?.list}
              renderItem={(order) => (
                <List.Item>
                  <OrderCard order={order} onStatusChange={updateOrderStatus} />
                </List.Item>
              )}
              style={{ width: "100%" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={orders?.meta.total}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </Space>
        }
        modal={
          <ItemModalContainer
            itemName="Заказ"
            // ? Ключ необходим для обновления полей формы, тк по дефолту форма после монтирования не изменяется
            key={editOrder?.id}
            isEdit={Boolean(editOrder)}
            isPending={isPending}
            callback={mutate}
            initialValues={editOrder}
            formFields={orderFormFields}
            open={isOpenModal}
            closeModal={closeModal}
          />
        }
      />
    </>
  );
}
