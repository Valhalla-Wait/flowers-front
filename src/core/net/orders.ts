import { makeRequest } from "@/utils/makeRequest";
import { AuthRequests } from "./auth";
import { ApiResponse, CartItemType, MetaType } from "./types";

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

type OrdersQueryType = {
  currentPage: number;
  pageSize: number;
  userId?: string;
  status?: OrderStatus;
};

export class OrdersRequests {
  static async createOrder() {
    const response = await makeRequest<{
      data: OrderItemType;
    }>({
      method: "post",
      url: "orders",
    });

    return response.data;
  }

  static async acceptOrder(orderId: string) {
    const response = await makeRequest<ApiResponse>({
      method: "post",
      url: `orders/accept/${orderId}`,
    });

    return response.data;
  }

  static async completeOrder(orderId: string) {
    const response = await makeRequest<ApiResponse>({
      method: "post",
      url: `orders/complete/${orderId}`,
    });

    return response.data;
  }

  static async deliveryOrder(orderId: string) {
    const response = await makeRequest<ApiResponse>({
      method: "post",
      url: `orders/delivery/${orderId}`,
    });

    return response.data;
  }

  static async cancelOrder(orderId: string) {
    const response = await makeRequest<ApiResponse>({
      method: "delete",
      url: `orders/cancel/${orderId}`,
    });

    return response.data;
  }

  static async updateOrder(orderId: string, data: Partial<OrderItemType>) {
    const response = await makeRequest<OrderItemType>({
      method: "patch",
      url: `orders/${orderId}`,
      data,
    });

    return response.data;
  }

  static async getOrders(query: OrdersQueryType) {
    const response = await makeRequest<OrdersDataType>({
      method: "get",
      url: "orders",
      params: query,
    });

    return response.data;
  }
}
