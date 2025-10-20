import { makeRequest } from "@/utils/makeRequest";
import {
  ApiResponse,
  ConsumableOutType,
  CreateConsumableDataType,
  MetaType,
  UpdateConsumableDataType,
} from "./types";

export class ConsumablesRequests {
  static async get(currentPage: number, pageSize: number, ids?: string[]) {
    const response = await makeRequest<{
      list: ConsumableOutType[];
      meta: MetaType;
    }>({
      method: "get",
      url: "consumables",
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
      data: ConsumableOutType;
    }>({
      method: "get",
      url: `consumables/${id}`,
    });

    return response.data.data;
  }

  static async create(data: CreateConsumableDataType) {
    const response = await makeRequest<{
      data: ConsumableOutType;
    }>({
      data,
      method: "post",
      url: `consumables`,
    });

    return response.data.data;
  }
  static async update(id: string, data: UpdateConsumableDataType) {
    const response = await makeRequest<{
      data: ConsumableOutType;
    }>({
      data,
      method: "patch",
      url: `consumables/${id}`,
    });

    return response.data.data;
  }
  static async delete(id: string) {
    const response = await makeRequest<{
      data: ApiResponse;
    }>({
      method: "delete",
      url: `consumables/${id}`,
    });

    return response.data.data;
  }
}
