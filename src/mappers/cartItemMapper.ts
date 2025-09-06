import { CartItemProductType, CartItemType } from "@/core/net/types";

export const CartItemMapper = (
  item: CartItemProductType,
  count: number
): CartItemType => {
  return {
    product: item,
    count,
    productTotalPrice: item.price * count,
  };
};
