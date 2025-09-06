import { Alert, Form } from "antd";
import styles from "./authForm.module.css";
import { useForm } from "antd/es/form/Form";
import { BlackActionBtn } from "../blackActionBtn/blackActionBtn";
import { AuthRequests } from "@/core/net/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthDataFetchType, AuthDataType } from "@/core/net/types";
import { CSSProperties, useState } from "react";
import { SignUpFormTemplate } from "./templates/signUpTemplate";
import { SignInFormTemplate } from "./templates/signInTemplate";
import { CartStoreType, useStore } from "@/core/store/store";
import { useShallow } from "zustand/shallow";
import Cookies from "js-cookie";

enum AuthTypeEnum {
  SignIn = "signIn",
  SignUp = "signUp",
}
type AuthTypeData = Record<
  AuthTypeEnum,
  {
    template: JSX.Element;
    label: string;
    btnTitle: string;
    request: (data: AuthDataType) => Promise<AuthDataFetchType>;
  }
>;

export const AuthInputStyle: CSSProperties = {
  borderColor: "black",
  borderRadius: 0,
  fontSize: 18,
};

const authDataByType: AuthTypeData = {
  [AuthTypeEnum.SignUp]: {
    label: "Регистрация",
    btnTitle: "Зарегистрироваться",
    template: <SignUpFormTemplate />,
    request: AuthRequests.SignUp,
  },
  [AuthTypeEnum.SignIn]: {
    label: "Вход",
    btnTitle: "Войти",
    template: <SignInFormTemplate />,
    request: AuthRequests.SignIn,
  },
};

export const AuthForm = () => {
  const tempCart = useStore((store) => store.tempCart);
  const [authType, setAuthType] = useState<AuthTypeEnum>(AuthTypeEnum.SignIn);
  const [authError, setAuthError] = useState<string | null>(null);
  const [form] = useForm();
  const { clearTempCart } = useStore(
    useShallow(({ clearTempCart }) => ({
      clearTempCart,
    }))
  );

  const clearAuthError = () => setAuthError(null);
  const setAuthErrorMessage = (message: string) => {
    if (message !== authError) {
      setAuthError(message);
    }
  };

  const setSignInAuthType = () => {
    clearAuthError();
    form.resetFields();
    setAuthType(AuthTypeEnum.SignIn);
  };
  const setSignUpAuthType = () => {
    clearAuthError();
    form.resetFields();
    setAuthType(AuthTypeEnum.SignUp);
  };

  const setCookie = (tempCart: CartStoreType) => {
    Cookies.set("tempCart", JSON.stringify(tempCart));
  };

  const { isPending, mutate } = useMutation({
    mutationFn: (data: AuthDataType) => {
      return authDataByType[authType].request(data);
    },
    onSuccess: () => {
      clearTempCart(setCookie);
      queryClient.refetchQueries({ queryKey: ["profile"] });
    },
    onError: (data) => setAuthErrorMessage((data as any).response.data.message),
  });

  const queryClient = useQueryClient();

  const onFinish = ({ phone, password }: AuthDataType) => {
    const data: AuthDataType = {
      phone: "8" + phone,
      password,
    };

    if (tempCart.productsData.length)
      [
        (data.tempCartProducts = tempCart.productsData.map(({ id, count }) => ({
          productId: id,
          count,
        }))),
      ];

    mutate(data);
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{authDataByType[authType].label}</div>

      {authError ? (
        <Alert
          style={{
            margin: "10px 0",
          }}
          message={authError}
          type="error"
          closable
          afterClose={clearAuthError}
        />
      ) : (
        <></>
      )}

      <Form
        layout="vertical"
        form={form}
        requiredMark="optional"
        onFinish={onFinish}
        autoComplete="off"
      >
        {authDataByType[authType].template}

        <div className={styles.submitBlock}>
          <Form.Item
            style={{
              marginBottom: "10px",
            }}
          >
            <BlackActionBtn
              callback={onSubmit}
              style={{
                padding: "5px 10px",
                fontSize: "18px",
              }}
              disabled={isPending}
              link=""
              title={authDataByType[authType].btnTitle}
            />
          </Form.Item>

          {authType === AuthTypeEnum.SignIn ? (
            <div className={styles.switchAuth}>
              У вас еще нет аккаунта?{" "}
              <span
                onClick={setSignUpAuthType}
                className={styles.switchAuthBtn}
              >
                Зарегистрироваться
              </span>
            </div>
          ) : (
            <div className={styles.switchAuth}>
              Уже есть аккаунт?{" "}
              <span
                onClick={setSignInAuthType}
                className={styles.switchAuthBtn}
              >
                Войти
              </span>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};
