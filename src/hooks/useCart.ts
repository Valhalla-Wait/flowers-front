import {
  AddToCartDataType,
  CartRequests,
  UpdateProductCartCountDataType,
} from "@/core/net/cart";
import { ProductsRequests } from "@/core/net/products";
import { CartDataType } from "@/core/net/types";
import { CartStoreType, useStore } from "@/core/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useShallow } from "zustand/shallow";

export type UseCountSelectorDataType = {
  productId: string;
  price?: number;
  count?: number;
};

// TODO: Рефакторинг
export const useCart = ({
  productId,
  ...optional
}: UseCountSelectorDataType) => {
  const queryClient = useQueryClient();

  const {
    profile,
    removeFromTempCart,
    updateCountTempCartProduct,
    addToTempCart,
    tempCart,
  } = useStore(
    useShallow(
      ({
        profile,
        removeFromTempCart,
        updateCountTempCartProduct,
        addToTempCart,
        tempCart,
      }) => ({
        profile,
        removeFromTempCart,
        updateCountTempCartProduct,
        addToTempCart,
        tempCart,
      })
    )
  );

  const currentProduct = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductsRequests.getById(productId),
  });

  const cartProducts = useQuery<CartDataType>({
    queryKey: ["cartProducts", 1],
    queryFn: () => CartRequests.getCart(1, 10),
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProductCartCountDataType) =>
      CartRequests.updateCartProductCount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });

  const addMutation = useMutation({
    mutationFn: (data: AddToCartDataType) => CartRequests.addToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts", 1] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      CartRequests.removeProductFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartProducts"] });
    },
  });

  const setCookie = (tempCart: CartStoreType) => {
    Cookies.set("tempCart", JSON.stringify(tempCart));
  };

  const removeProduct = () => {
    const { price, count } = optional;
    if (!profile && price && Number.isInteger(count)) {
      // TODO: Делать подсчет на уровне удаления
      const totalProductPriceInCart = price * Number(count);

      return removeFromTempCart(productId, totalProductPriceInCart, setCookie);
    } else {
      return removeMutation.mutate(productId);
    }
  };

  const updateProductCount = (count: number) => {
    if (count <= 0) {
      removeProduct();
    } else {
      if (!profile && (optional?.price || currentProduct.data?.price)) {
        const price = (currentProduct?.data?.price ?? optional.price) as number;
        return updateCountTempCartProduct(productId, price, count, setCookie);
      } else {
        return updateMutation.mutate({
          productId,
          count,
        });
      }
    }
  };

  const addProduct = () => {
    if (profile) {
      addMutation.mutate({
        productId,
        count: 1,
      });
    } else if (currentProduct.data) {
      addToTempCart(
        {
          productsData: [
            {
              id: productId,
              count: 1,
            },
          ],
          totalPrice: tempCart.totalPrice + currentProduct.data.price,
        },
        setCookie
      );
    }
  };

  const { data: tempCartData } = useQuery({
    queryKey: ["tempCartProducts", 1],
    queryFn: () => CartRequests.getTempCartByIds(1, 10, tempCart.productsData),
    retry: false,
  });

  const getCartProducts = () => {
    if (cartProducts.data) {
      return cartProducts.data;
    } else if (tempCart.productsData.length && tempCartData?.list.length) {
      return tempCartData;
    }

    return null;
  };

  const getCartProductById = (id: string) => {
    if (cartProducts.data) {
      return cartProducts.data.list.find(({ product }) => product.id === id);
    } else if (tempCart.productsData.length && tempCartData?.list.length) {
      return tempCartData.list.find(({ product }) => product.id === id);
    }

    return null;
  };

  return {
    updateProductCount,
    addProduct,
    removeProduct,
    getCartProductById,
    cart: getCartProducts(),
  };
};
