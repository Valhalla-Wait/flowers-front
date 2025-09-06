import { makeRequest } from "@/utils/makeRequest";
import { CartItemProductType, MetaType } from "./types";

export class ProductsRequests {
  static async getProducts(
    currentPage: number,
    pageSize: number,
    ids?: string[]
  ) {
    const response = await makeRequest<{
      list: CartItemProductType[];
      meta: MetaType;
    }>({
      method: "get",
      url: "products",
      params: {
        page: currentPage,
        limit: pageSize,
        ids,
      },
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
}
