import { makeRequest } from "@/utils/makeRequest";
import {
  ApiResponse,
  CreateTagDataType,
  MetaType,
  TagType,
  UpdateTagDataType,
} from "./types";

export class TagsRequests {
  static async get(currentPage: number, pageSize: number, ids?: string[]) {
    const response = await makeRequest<{
      list: TagType[];
      meta: MetaType;
    }>({
      method: "get",
      url: "tags",
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
      data: TagType;
    }>({
      method: "get",
      url: `tags/${id}`,
    });

    return response.data.data;
  }

  static async create(data: CreateTagDataType) {
    const response = await makeRequest<{
      data: TagType;
    }>({
      data,
      method: "post",
      url: `tags`,
    });

    return response.data.data;
  }
  static async update(id: string, data: UpdateTagDataType) {
    const response = await makeRequest<{
      data: TagType;
    }>({
      data,
      method: "patch",
      url: `tags/${id}`,
    });

    return response.data.data;
  }
  static async delete(id: string) {
    const response = await makeRequest<{
      data: ApiResponse;
    }>({
      method: "delete",
      url: `tags/${id}`,
    });

    return response.data.data;
  }
}
