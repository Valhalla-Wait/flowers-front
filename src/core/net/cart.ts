import { makeRequest } from "@/utils/makeRequest";
import { CartDataType, CartItemType } from "./types";
import { ProductsRequests } from "./products";
import { ProductDataItemType } from "../store/store";
import { CartItemMapper } from "@/mappers/cartItemMapper";

export type AddToCartDataType = {
  count: number;
  productId: string;
};

export type UpdateProductCartCountDataType = AddToCartDataType;

export class CartRequests {
  static async getCart(currentPage: number, pageSize: number) {
    const response = await makeRequest<CartDataType>({
      method: "get",
      url: "cart",
      params: {
        page: currentPage,
        limit: pageSize,
      },
    });

    return response.data;
  }

  static async checkProductInCart(productId: string) {
    const response = await makeRequest<{
      data: CartItemType;
    }>({
      method: "get",
      url: `cart/check-product/${productId}`,
    });

    return response?.data?.data;
  }

  static async getTempCartByIds(
    currentPage: number,
    pageSize: number,
    tempCartProducts: ProductDataItemType[]
  ) {
    const data: CartDataType = {
      list: [],
      meta: {
        total: 0,
      },
      totalPrice: 0,
    };

    if (!tempCartProducts.length) {
      return data;
    }

    const productsData = await ProductsRequests.getProducts(
      currentPage,
      pageSize,
      tempCartProducts.map((el) => el.id)
    );

    data.meta = productsData.meta;

    productsData.list.forEach((el) => {
      const count = tempCartProducts.find(({ id }) => id === el.id)
        ?.count as number;

      const mappedData = CartItemMapper(el, count);

      data.list.push(mappedData);
      data.totalPrice += mappedData.productTotalPrice;
    });

    return data;
  }

  static async addToCart(data: AddToCartDataType) {
    const response = await makeRequest({
      method: "post",
      url: "cart",
      data,
    });

    return response.data;
  }

  static async updateCartProductCount(data: UpdateProductCartCountDataType) {
    const response = await makeRequest({
      method: "patch",
      url: "cart",
      data,
    });

    return response.data;
  }

  static async removeProductFromCart(productId: string) {
    const response = await makeRequest({
      method: "delete",
      url: `cart/${productId}`,
    });

    return response.data;
  }
}
