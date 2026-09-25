import { makeRequest } from "@/utils/makeRequest";

export type AddToFavoritesDataType = {
  productId: string;
};

export type RemoveFromFavoritesDataType = {
  productId: string;
};

export class FavoritesRequests {
  static async addToFavorites(data: AddToFavoritesDataType) {
    // TODO: Заменить URL, когда будет готов API
    const response = await makeRequest({
      method: "post",
      url: "favorites",
      data,
    });

    return response.data;
  }

  static async removeFromFavorites(data: RemoveFromFavoritesDataType) {
    // TODO: Заменить URL, когда будет готов API
    const response = await makeRequest({
      method: "delete",
      url: `favorites/${data.productId}`,
    });

    return response.data;
  }

  static async getFavorites() {
    // TODO: Заменить URL, когда будет готов API
    const response = await makeRequest<{
      data: { productId: string }[];
    }>({
      method: "get",
      url: "favorites",
    });

    return response.data;
  }
}
