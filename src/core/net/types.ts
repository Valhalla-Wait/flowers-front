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

export type TagType = {
  id: string;
  title: string;
};

export type CartItemProductType = {
  id: string;
  title: string;
  photo: string;
  isAvailable?: boolean;
  price: number;
  inStock: boolean;
  tags?: TagType[];
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
  tagIds?: string[];
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

export type CreateTagDataType = {
  title: string;
};

export type UpdateTagDataType = Partial<CreateTagDataType>;

export type SortByType = "title" | "createdAt" | "price";
export type SortOrderType = "asc" | "desc";

export type GetProductsParamsType = {
  page: number;
  limit: number;
  ids?: string[];
  tagIds?: string[];
  search?: string;
  sortBy?: SortByType;
  sort?: SortOrderType;
};
