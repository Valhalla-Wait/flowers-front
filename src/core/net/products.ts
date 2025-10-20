import { makeRequest } from "@/utils/makeRequest";
import {
  ApiResponse,
  CartItemProductType,
  CreateProductDataType,
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

  static async getProducts(
    currentPage: number,
    pageSize: number,
    ids?: string[]
  ) {
    const params: {
      page: number;
      limit: number;
      ids?: string[];
    } = { page: currentPage, limit: pageSize };
    if (ids) params.ids = ids;

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
