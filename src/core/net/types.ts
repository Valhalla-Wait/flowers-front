import { AddToCartDataType } from "./cart";

export type ApiResponse = {
  message: string;
  statusCode: number;
};

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

export type UpdateProductDataType = Partial<
  CreateProductDataType & {
    id: string;
    isAvailable: boolean;
  }
>;

export type CreateProductDataType = {
  title: string;
  price: number;
  photo: string;
  consumables?: {
    id: string;
    requiredCount: number;
  }[];
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

export type AuthAdminDataType = Omit<AuthDataType, "tempCartProducts">;

export type AuthDataFetchType = {
  user: UserType;
  accessToken: string;
  refreshToken: string;
  success: CartItemProductType[];
  failed: CartItemProductType[];
};

export type AuthAdminDataFetchType = Omit<
  AuthDataFetchType,
  "success" | "failed"
>;

export type ProfileDataFetchType = {
  data: {
    firstName: string | null;
    lastName: string | null;
    phone: string;
    role: Roles;
  };
};

export type ConsumableOutType = {
  id: string;
  title: string;
  count: number;
};

export type CreateConsumableDataType = {
  title: string;
  count: number;
};

export type UpdateConsumableDataType = Partial<CreateConsumableDataType>;
