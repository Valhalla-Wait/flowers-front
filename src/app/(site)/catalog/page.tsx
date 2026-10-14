"use client";
import { ProductList } from "@/components/productList/productList";
import styles from "./page.module.css";
import { useEffect, useMemo, useState } from "react";
import { ProductListCardType } from "@/components/productList/productListCard/productListCard";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CartRequests } from "@/core/net/cart";
import { ProductsRequests } from "@/core/net/products";
import {
  CartDataType,
  SortByType,
  SortOrderType,
} from "@/core/net/types";
import { useStore } from "@/core/store/store";
import { makeRequest } from "@/utils/makeRequest";
import { TagsRequests } from "@/core/net/tags";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Input, Select } from "antd";
import axios from "axios";

// TODO: Опции сортировки дублируются с админским каталогом, вынести
const sortOptions: { value: string; label: string }[] = [
  { value: "createdAt-desc", label: "Сначала новые" },
  { value: "createdAt-asc", label: "Сначала старые" },
  { value: "title-asc", label: "Название А-Я" },
  { value: "title-desc", label: "Название Я-А" },
  { value: "price-asc", label: "Цена по возрастанию" },
  { value: "price-desc", label: "Цена по убыванию" },
];

export default function Catalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const [sortBy, setSortBy] = useState<SortByType>("createdAt");
  const [sort, setSort] = useState<SortOrderType>("desc");

  const productsData = useStore((store) => store.tempCart.productsData);

  // TODO: Сильно большой limit, чтобы получить все теги — при необходимости добавить отдельный эндпоинт
  const { data: tags } = useQuery<{
    list: { id: string; title: string }[];
  }>({
    queryKey: ["tags"],
    queryFn: () => TagsRequests.get(1, 1000),
    retry: false,
  });

  // placeholderData: keepPreviousData — при смене фильтра/поиска/сортировки старый
  // список остаётся на экране до прихода новых данных, чтобы не было пустого мигания
  const { data: products } = useQuery<{
    list: ProductListCardType[];
    meta: Record<string, number>;
  }>({
    queryKey: [
      "products",
      currentPage,
      selectedTagIds,
      debouncedSearch,
      sortBy,
      sort,
    ],
    queryFn: () =>
      ProductsRequests.getProducts({
        page: currentPage,
        limit: 10,
        tagIds: selectedTagIds,
        search: debouncedSearch,
        sortBy,
        sort,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: cart } = useQuery<CartDataType>({
    queryKey: ["cartProducts", currentPage, 20],
    queryFn: () => CartRequests.getCart(currentPage, 20),
    retry: false,
  });

  const queryClient = useQueryClient();
  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      axios.get("http://51.250.83.228:7136/api/content-managers", {
        withCredentials: true,
      }),
    retry: false,
  });

  console.log("ADMINS", admins);

  const { mutate } = useMutation({
    mutationFn: () =>
      makeRequest({
        method: "post",
        url: "auth",
        data: {
          login: "admin",
          password: "123456",
        },
      }),
    onSuccess: async (data) => {
      console.log("AUTH", data);
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      // const admins = await makeRequest({
      //   method: "get",
      //   url: "content-managers",
      // });
      // console.log("ADMINS", admins);
    },
    retry: false,
  });

  useEffect(() => {
    mutate();
  }, []);

  // Список вычисляется напрямую из данных запроса. Когда меняется фильтр,
  // React Query приносит новые данные в `products` — useMemo пересчитывает
  // список синхронно в том же рендере, обновление происходит без перезагрузки.
  const catalogProducts = useMemo(() => {
    if (!products) return null;

    if (cart) {
      return {
        ...products,
        list: products.list.map((product) => ({
          ...product,
          inCartCount: cart.list.filter(
            (cartProduct) => cartProduct.product.id === product.id
          ).length,
        })),
      };
    }

    if (productsData?.length) {
      return {
        ...products,
        list: products.list.map((product) => ({
          ...product,
          inCartCount: productsData.filter(
            (cartProduct) => cartProduct.id === product.id
          ).length,
        })),
      };
    }

    return products;
  }, [products, cart, productsData]);

  return (
    <div className={styles.container}>
      {/* <div className={styles.saleBanner}></div> */}

      {/* <div className={styles.header}>
            <div className={styles.sort}>Сортировка</div>
            <div className={styles.filter}>Фильтры</div>
        </div> */}

      <div className={styles.filters}>
        <Input
          allowClear
          placeholder="Поиск по названию"
          value={search}
          onChange={(event) => {
            setCurrentPage(1);
            setSearch(event.target.value);
          }}
          className={styles.search}
        />
        <Select
          mode="multiple"
          allowClear
          className={styles.tagFilter}
          placeholder="Фильтр по тегам"
          value={selectedTagIds}
          options={(tags?.list ?? []).map((tag) => ({
            value: tag.id,
            label: tag.title,
          }))}
          onChange={(value) => {
            setCurrentPage(1);
            setSelectedTagIds(value);
          }}
        />
        <Select
          className={styles.sort}
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
        />
      </div>

      <ProductList
        currentPage={currentPage}
        onChange={setCurrentPage}
        total={catalogProducts?.meta.pages ?? 0}
        list={catalogProducts?.list ?? []}
      />
    </div>
  );
}
