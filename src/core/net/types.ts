import { AddToCartDataType } from "./cart";

export enum Roles {
  ADMIN = "admin",
  USER = "user",
}

export type UserType = {
  phone: string;
  role: Roles;
  firstName?: string;
  lastName?: string;
};

export type CartDataType = {
  list: CartItemType[];
  totalPrice: number;
  meta: MetaType;
};

export type CartItemProductType = {
  id: string;
  title: string;
  photo: string;
  isAvailable?: boolean;
  price: number;
  inStock: boolean;
};

export type CartItemType = {
  product: CartItemProductType;
  count: number;
  productTotalPrice: number;
};

export type MetaType = {
  total: number;
  limit?: number;
  page?: number;
  pages?: number;
};

export type AuthDataType = {
  phone: string;
  password: string;
  tempCartProducts?: AddToCartDataType[];
};
export type AuthDataFetchType = {
  user: UserType;
  accessToken: string;
  refreshToken: string;
  success: CartItemProductType[];
  failed: CartItemProductType[];
};

export type ProfileDataFetchType = {
  data: {
    firstName: string | null;
    lastName: string | null;
    phone: string;
    role: Roles;
  };
};
