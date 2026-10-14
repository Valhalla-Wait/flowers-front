"use client";
import ProductCard from "@/components/admin/productCard/productCard";
import { ProductsRequests } from "@/core/net/products";
import { TagsRequests } from "@/core/net/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Input, InputNumber, List, message, Select, Upload } from "antd";
import { useMemo, useState } from "react";
import { AdminDefaultPageLayout } from "@/components/admin/adminPageLayout/adminPageLayout";
import {
  CartItemProductType,
  SortByType,
  SortOrderType,
  TagType,
} from "@/core/net/types";
import { ItemModalContainer } from "@/components/admin/itemModalContainer/itemModalContainer";
import { PlusOutlined } from "@ant-design/icons";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { FormFieldType } from "@/components/admin/itemModalContainer/itemModalForm";

export type EditProductType = {
  id: string;
  title: string;
  price: number;
  photo?: string;
  tags?: TagType[];
} | null;

const pageSize = 8;

// TODO: Опции сортировки дублируются с пользовательским каталогом, вынести
const sortOptions: { value: string; label: string }[] = [
  { value: "createdAt-desc", label: "Сначала новые" },
  { value: "createdAt-asc", label: "Сначала старые" },
  { value: "title-asc", label: "Название А-Я" },
  { value: "title-desc", label: "Название Я-А" },
  { value: "price-asc", label: "Цена по возрастанию" },
  { value: "price-desc", label: "Цена по убыванию" },
];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState<EditProductType>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [sortBy, setSortBy] = useState<SortByType>("createdAt");
  const [sort, setSort] = useState<SortOrderType>("desc");
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient();

  // TODO: Логика загрузки тегов дублируется между страницами, вынести в кастомный хук
  const { data: tags } = useQuery<{
    list: TagType[];
  }>({
    queryKey: ["tags"],
    queryFn: () => TagsRequests.get(1, 1000),
    retry: false,
    refetchOnMount: false,
  });

  const tagOptions = useMemo(
    () =>
      (tags?.list ?? []).map((tag) => ({
        value: tag.id,
        label: tag.title,
      })),
    [tags]
  );

  const formFields: FormFieldType[] = useMemo(
    () => [
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
      {
        formProps: {
          label: "Теги",
          name: "tagIds",
        },
        children: (
          <Select
            mode="multiple"
            allowClear
            placeholder="Выберите теги"
            options={tagOptions}
          />
        ),
      },
    ],
    [tagOptions]
  );

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

  const { data: products, isLoading } = useQuery<{
    list: CartItemProductType[];
    meta: Record<string, number>;
  }>({
    queryKey: ["products", currentPage, selectedTagIds, debouncedSearch, sortBy, sort],
    queryFn: () =>
      ProductsRequests.getProducts({
        page: currentPage,
        limit: pageSize,
        tagIds: selectedTagIds,
        search: debouncedSearch,
        sortBy,
        sort,
      }),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ title, price, photo, tagIds }: any) => {
      // TODO: Рефакторинг
      const preparedData = {
        id: editProduct?.id,
        title,
        price,
        photo: photo?.[0]?.thumbUrl ?? editProduct?.photo,
        tagIds,
      };

      return editProduct
        ? ProductsRequests.update(preparedData)
        : ProductsRequests.create(preparedData);
    },
    onSuccess: (newItem) => {
      queryClient.setQueryData(
        ["products", currentPage, selectedTagIds, debouncedSearch, sortBy, sort],
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
            initialValues={{
              ...editProduct,
              tagIds: editProduct?.tags?.map((tag) => tag.id) ?? [],
            }}
            formFields={formFields}
            open={isOpenModal}
            closeModal={closeModal}
          />
        }
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <Input
            allowClear
            placeholder="Поиск по названию"
            value={search}
            onChange={(event) => {
              setCurrentPage(1);
              setSearch(event.target.value);
            }}
            style={{
              width: 260,
            }}
          />
          <Select
            mode="multiple"
            allowClear
            style={{
              minWidth: 220,
            }}
            placeholder="Фильтр по тегам"
            value={selectedTagIds}
            options={tagOptions}
            onChange={(value) => {
              setCurrentPage(1);
              setSelectedTagIds(value);
            }}
          />
          <Select
            value={`${sortBy}-${sort}`}
            options={sortOptions}
            onChange={(value) => {
              const [nextSortBy, nextSort] = value.split("-") as [
                SortByType,
                SortOrderType
              ];
              setCurrentPage(1);
              setSortBy(nextSortBy);
              setSort(nextSort);
            }}
            style={{
              minWidth: 180,
            }}
          />
        </div>
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
      </AdminDefaultPageLayout>
    </>
  );
}
