import { create } from "zustand";
import { CartItemType, Roles } from "../net/types";

export type ProductDataItemType = {
  id: string;
  count: number;
};

export type CartStoreType = {
  productsData: ProductDataItemType[];
  totalPrice: number;
};

export type ProfileStoreType = {
  firstName: string | null;
  lastName: string | null;
  phone: string;
  role: Roles;
};

type StoreType = {
  profile: ProfileStoreType | null;
  isProfileLoading: boolean;
  tempCart: CartStoreType;

  setProfile: (profileData: ProfileStoreType | null) => void;
  setIsProfileLoading: (isLoading: boolean) => void;
  addToTempCart: (
    productList: CartStoreType,
    setCookie: (tempCart: CartStoreType) => void
  ) => void;
  setTempCart: (tempCartData: CartStoreType) => void;
  removeFromTempCart: (
    id: string,
    totalProductPrice: number,
    setCookie: (tempCart: CartStoreType) => void
  ) => void;
  clearTempCart: (setCookie: (tempCart: CartStoreType) => void) => void;
  updateCountTempCartProduct: (
    id: string,
    price: number,
    count: number,
    setCookie: (tempCart: CartStoreType) => void
  ) => void;
};

export const useStore = create<StoreType>((set) => ({
  profile: null,
  isProfileLoading: false,
  tempCart: {
    productsData: [],
    totalPrice: 0,
  },
  setProfile: (profileData: ProfileStoreType | null) =>
    set((state) => ({ ...state, profile: profileData })),
  setIsProfileLoading: (isLoading: boolean) =>
    set((state) => ({ ...state, isProfileLoading: isLoading })),
  addToTempCart: (cartData, setCookie) =>
    set((state) => {
      // TODO: Рефакторинг
      cartData.productsData.forEach((el) => {
        const foundIndex = state.tempCart.productsData.findIndex(
          (tempProduct) => tempProduct.id === el.id
        );

        if (foundIndex >= 0) {
          state.tempCart.productsData[foundIndex].count =
            state.tempCart.productsData[foundIndex].count + el.count;
        } else {
          state.tempCart.productsData.push(el);
        }
      });

      const newTempCart = {
        productsData: [...state.tempCart.productsData],
        totalPrice: cartData?.totalPrice ?? 0,
      };

      setCookie(newTempCart);

      return {
        ...state,
        tempCart: newTempCart,
      };
    }),
  setTempCart: (tempCartData: CartStoreType) =>
    set((state) => {
      return {
        ...state,
        tempCart: tempCartData,
      };
    }),
  removeFromTempCart: (id, totalProductPrice, setCookie) =>
    set((state) => {
      const newTempCart = {
        productsData: state.tempCart.productsData.filter((el) => el.id !== id),
        totalPrice: state.tempCart.totalPrice - totalProductPrice,
      };

      setCookie(newTempCart);

      return {
        ...state,
        tempCart: newTempCart,
      };
    }),

  clearTempCart: (setCookie) =>
    set((state) => {
      const newTempCart = {
        productsData: [],
        totalPrice: 0,
      };

      setCookie(newTempCart);

      return {
        ...state,
        tempCart: newTempCart,
      };
    }),
  updateCountTempCartProduct: (id, price, count, setCookie) =>
    set((state) => {
      const index = state.tempCart.productsData.findIndex((el) => el.id === id);

      const updated = [...state.tempCart.productsData];

      updated[index] = {
        ...state.tempCart.productsData[index],
        count,
      };

      const newTempCart = {
        productsData: updated,
        totalPrice: state.tempCart.totalPrice + price,
      };

      setCookie(newTempCart);

      return {
        ...state,
        tempCart: newTempCart,
      };
    }),
}));
