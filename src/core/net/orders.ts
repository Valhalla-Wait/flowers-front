import { makeRequest } from "@/utils/makeRequest";
import { AuthRequests } from "./auth";
import { CartItemType, MetaType } from "./types";

export enum OrderStatus {
  // Заказ в обработке
  IN_PROCESS = "in_process",

  // Заказ взят в работу
  IN_WORK = "in_work",

  // Заказ доставляется
  DELIVERY = "delivery",

  // Заказ выполнен
  COMPLETED = "completed",

  // Заказ отменен
  CANCELED = "canceled",
}

export type OrderItemType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  totalPrice: number;
  phone: string;
  products: CartItemType[];
};

export type OrdersDataType = {
  list: OrderItemType[];
  meta: MetaType;
};

export class OrdersRequests {
  static async createOrder() {
    const response = await makeRequest({
      method: "post",
      url: "orders",
    });

    return response.data;
  }

  static async getOrders(currentPage: number, pageSize: number) {
    const response = await makeRequest<OrdersDataType>({
      method: "get",
      url: "orders",
      params: {
        page: currentPage,
        limit: pageSize,
      },
    });

    return response.data;
  }

  // static async updateCartProductCount(data: UpdateProductCartCountDataType) {
  //   await AuthRequests.TestSignIn();

  //   const response = await makeRequest({
  //     method: "patch",
  //     url: "cart",
  //     data,
  //   });

  //   return response.data;
  // }

  // static async removeProductFromCart(productId: string) {
  //   await AuthRequests.TestSignIn();

  //   const response = await makeRequest({
  //     method: "delete",
  //     url: `cart/${productId}`,
  //   });

  //   return response.data;
  // }
}
