import { makeRequest } from "@/utils/makeRequest";
import {
  ApiResponse,
  CartItemProductType,
  CreateProductDataType,
  GetProductsParamsType,
  MetaType,
  UpdateProductDataType,
} from "./types";

export class ProductsRequests {
  static async create(data: CreateProductDataType) {
    const response = await makeRequest<{
      data: CartItemProductType;
    }>({
      method: "post",
      url: "products",
      data,
    });

    return response.data.data;
  }

  static async getProducts({
    page,
    limit,
    ids,
    tagIds,
    search,
    sortBy,
    sort,
  }: GetProductsParamsType) {
    const params: {
      page: number;
      limit: number;
      ids?: string[];
      tagIds?: string[];
      search?: string;
      sortBy?: string;
      sort?: string;
    } = { page, limit };
    if (ids?.length) params.ids = ids;
    if (tagIds?.length) params.tagIds = tagIds;
    if (search) params.search = search;
    if (sortBy) params.sortBy = sortBy;
    if (sort) params.sort = sort;

    const response = await makeRequest<{
      list: CartItemProductType[];
      meta: MetaType;
    }>({
      method: "get",
      url: "products",
      params,
    });

    return response.data;
  }
  static async getById(id: string) {
    const response = await makeRequest<{
      data: CartItemProductType;
    }>({
      method: "get",
      url: `products/${id}`,
    });

    return response.data.data;
  }
  static async update({ id, ...data }: UpdateProductDataType) {
    const response = await makeRequest<{
      data: CartItemProductType;
    }>({
      method: "patch",
      url: `products/${id}`,
      data,
    });

    return response.data.data;
  }

  static async delete(id: string) {
    const response = await makeRequest<{
      data: ApiResponse;
    }>({
      method: "delete",
      url: `products/${id}`,
    });

    return response.data.data;
  }
}
