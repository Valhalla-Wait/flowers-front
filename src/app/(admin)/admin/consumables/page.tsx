"use client";
import ConsumableCard from "@/components/admin/consumableCard/consumableCard";
import { ConsumablesRequests } from "@/core/net/consumables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, InputNumber, List, message } from "antd";
import { useState } from "react";
import { AdminDefaultPageLayout } from "@/components/admin/adminPageLayout/adminPageLayout";
import { ConsumableOutType, MetaType } from "@/core/net/types";
import { ItemModalContainer } from "@/components/admin/itemModalContainer/itemModalContainer";
import { FormFieldType } from "@/components/admin/itemModalContainer/itemModalForm";

export type EditConsumableType = {
  id: string;
  title: string;
} | null;

const pageSize = 20;

const formFields: FormFieldType[] = [
  {
    formProps: {
      label: "Название",
      name: "title",
      rules: [{ required: true, message: "Необходимо указать название" }],
    },
  },
  {
    formProps: {
      label: "Кол-во",
      name: "count",
      rules: [
        {
          required: true,
          message: "Необходимо указать кол-во",
          type: "number",
        },
      ],
    },
    children: <InputNumber />,
  },
];

export default function ConsumablesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState<EditConsumableType>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // TODO: Рефакторинг
  const alertSuccessMsg = () => {
    messageApi.open({
      type: "success",
      content: `Товар успешно ${editProduct ? "изменен" : "создан"}`,
    });
  };

  const alertErrorMsg = () => {
    messageApi.open({
      type: "error",
      content: `Не удалось ${editProduct ? "изменить" : "создать"} товар`,
    });
  };

  const openModal = () => setOpenModal(true);
  const closeModal = () => {
    setOpenModal(false);
    setEditProduct(null);
  };
  const openEditModal = (product: any) => {
    openModal();
    setEditProduct(product);
  };

  const {
    data: consumables,
    isLoading,
    isError,
  } = useQuery<{
    list: any[];
    meta: MetaType;
  }>({
    queryKey: ["consumables", currentPage],
    queryFn: () => ConsumablesRequests.get(currentPage, pageSize),
    retry: false,
    refetchOnMount: false,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ title, count }: any) =>
      editProduct
        ? ConsumablesRequests.update(editProduct?.id, { title, count })
        : ConsumablesRequests.create({ title, count }),
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ["consumables", currentPage],
        (oldData: {
          list: ConsumableOutType[];
          meta: Record<string, number>;
        }) => {
          if (!oldData) return oldData;
          if (editProduct) {
            const updatedList = oldData.list.map((item) =>
              item.id === newItem.id ? newItem : item
            );
            return {
              ...oldData,
              list: updatedList,
            };
          }

          oldData.list.push(newItem);
          return oldData;
        }
      );
      alertSuccessMsg();
      closeModal();
    },
    onError: alertErrorMsg,
  });

  const { isPending: isDeletePending, mutate: deleteConsumable } = useMutation({
    mutationFn: (id: string) => ConsumablesRequests.delete(id),
    onSuccess: () => {
      queryClient.setQueryData(
        ["consumables", currentPage],
        (oldData: {
          list: ConsumableOutType[];
          meta: Record<string, number>;
        }) => {
          if (!oldData) return oldData;
          const updatedList = oldData.list.filter((item) => item.id !== id);
          return {
            ...oldData,
            list: updatedList,
          };
        }
      );
      messageApi.open({
        type: "success",
        content: "Расходник успешно удален",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Не удалось удалить расходник",
      });
    },
  });

  const queryClient = useQueryClient();

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {contextHolder}
      <AdminDefaultPageLayout
        title="Расходники"
        openModal={openModal}
        modal={
          <ItemModalContainer
            itemName="Расходник"
            // ? Ключ необходим для обновления полей формы, тк по дефолту форма после монтирования не изменяется
            key={editProduct?.id}
            isEdit={Boolean(editProduct)}
            isPending={isPending}
            callback={mutate}
            initialValues={editProduct}
            formFields={formFields}
            open={isOpenModal}
            closeModal={closeModal}
          />
        }
        children={
          <List
            pagination={{
              onChange: (page) => setCurrentPage(page),
              pageSize,
              position: "bottom",
              align: "center",
              total: consumables?.meta.total,
            }}
            dataSource={consumables?.list}
            loading={isLoading}
            renderItem={(productData) => (
              <List.Item>
                <ConsumableCard
                  {...productData}
                  startEdit={() => openEditModal(productData)}
                  setCount={(count: number) =>
                    mutate({ id: productData.id, count })
                  }
                  onDelete={deleteConsumable}
                />
              </List.Item>
            )}
          />
        }
      />
    </>
  );
}
