"use client";
import ProductCard from "@/components/admin/productCard/productCard";
import { ProductsRequests } from "@/core/net/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InputNumber, List, message, Upload } from "antd";
import { useState } from "react";
import { AdminDefaultPageLayout } from "@/components/admin/adminPageLayout/adminPageLayout";
import { CartItemProductType } from "@/core/net/types";
import { ItemModalContainer } from "@/components/admin/itemModalContainer/itemModalContainer";
import { PlusOutlined } from "@ant-design/icons";
import { FormFieldType } from "@/components/admin/itemModalContainer/itemModalForm";

export type EditProductType = {
  id: string;
  title: string;
  price: number;
} | null;

const pageSize = 8;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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
      label: "Цена",
      name: "price",
      rules: [
        {
          required: true,
          message: "Необходимо указать цену",
          type: "number",
          transform: (value: string) => Number(value),
        },
      ],
    },
    children: <InputNumber />,
  },
  {
    formProps: {
      label: "Фото",
      name: "photo",
      rules: [{ required: true, message: "Необходимо добавить фото" }],
      getValueFromEvent: normFile,
    },
    children: (
      <Upload maxCount={1} listType="picture-card">
        <button
          style={{
            color: "inherit",
            cursor: "inherit",
            border: 0,
            background: "none",
          }}
          type="button"
        >
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
    ),
  },
];

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState<EditProductType>(null);
  const [messageApi, contextHolder] = message.useMessage();

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

  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery<{
    list: CartItemProductType[];
    meta: Record<string, number>;
  }>({
    queryKey: ["products", currentPage],
    queryFn: () => ProductsRequests.getProducts(currentPage, pageSize),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ title, price, photo }: any) => {
      // TODO: Рефакторинг
      const preparedData = {
        id: editProduct?.id,
        title,
        price,
        photo: photo[0].thumbUrl,
      };

      return editProduct
        ? ProductsRequests.update(preparedData)
        : ProductsRequests.create(preparedData);
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ["products", currentPage],
        (oldData: {
          list: CartItemProductType[];
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
    onError: (err) => {
      console.log(err);
      return alertErrorMsg();
    },
  });

  return (
    <>
      {contextHolder}
      <AdminDefaultPageLayout
        title="Товары"
        openModal={openModal}
        modal={
          <ItemModalContainer
            itemName="Товар"
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
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 1,
            }}
            pagination={{
              onChange: (page) => setCurrentPage(page),
              pageSize,
              position: "bottom",
              align: "center",
              total: products?.meta.total,
            }}
            dataSource={products?.list}
            loading={isLoading}
            renderItem={(productData) => (
              <List.Item>
                <ProductCard
                  startEdit={() => openEditModal(productData)}
                  {...productData}
                />
              </List.Item>
            )}
          />
        }
      />
    </>
  );
}
