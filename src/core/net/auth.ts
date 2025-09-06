import { makeRequest } from "@/utils/makeRequest";
import { AuthDataFetchType, AuthDataType, ProfileDataFetchType } from "./types";

export class AuthRequests {
  static async GetMe() {
    const response = await makeRequest<ProfileDataFetchType>({
      method: "get",
      url: "auth/me",
    });

    return response.data.data;
  }

  static async SignIn(data: AuthDataType) {
    const response = await makeRequest<AuthDataFetchType>({
      method: "post",
      url: "auth/sign-in",
      data,
    });

    return response.data;
  }

  static async SignUp(data: AuthDataType) {
    const response = await makeRequest<AuthDataFetchType>({
      method: "post",
      url: "auth/sign-up",
      data,
    });

    return response.data;
  }

  // static async UniversalAuth(phone: string) {
  //   const response = await makeRequest({
  //     method: "post",
  //     url: "auth/universal",
  //     data: {
  //       phone,
  //     },
  //   });

  //   return response.data;
  // }

  static async TestSignIn() {
    return this.SignIn({
      phone: "89101290091",
      password: "123456",
    });
  }

  static async Logout() {
    const response = await makeRequest({
      method: "post",
      url: "auth/logout",
    });

    return response.data;
  }
}
