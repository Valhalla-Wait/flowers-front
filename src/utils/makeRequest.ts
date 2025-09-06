import axios, { AxiosRequestConfig } from "axios";

//TODO: Брать из Env
const baseURL = "http://localhost:8888/api/";

export const makeRequest = async <T>({
  method,
  url,
  data,
  params,
}: {
  method: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  data?: any;
  params?: any;
}) => {
  const defaultConfig: AxiosRequestConfig = {
    method,
    baseURL,
    url,
    params,
    data,

    withCredentials: true,
  };

  return axios<T>(defaultConfig);
};
