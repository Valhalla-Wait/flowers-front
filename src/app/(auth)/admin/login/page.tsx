"use client";
import { Alert, Button, Form, Input } from "antd";
import styles from "./page.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthRequests } from "@/core/net/auth";
import { AuthAdminDataType, Roles } from "@/core/net/types";
import { useEffect, useState } from "react";
import { authDataByType } from "@/components/authForm/authForm";
import { BlackActionBtn } from "@/components/blackActionBtn/blackActionBtn";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { useStore } from "@/core/store/store";
import { Loader } from "@/components/loader";

// TODO: Логика дублируется в authForm
export default function AdminSignInPage() {
  const router = useRouter();
  const [form] = useForm();
  const queryClient = useQueryClient();
  const [authError, setAuthError] = useState<string | null>(null);
  const profile = useStore((store) => store.profile);
  const isProfileLoading = useStore((store) => store.isProfileLoading);

  useEffect(() => {
    if (profile?.role === Roles.ADMIN) {
      router.replace("/admin");
    }
  }, [profile]);

  // Если профиль загружается, показываем загрузку
  if (isProfileLoading) {
    return <Loader />;
  }

  const { isPending, mutate } = useMutation({
    mutationFn: (data: AuthAdminDataType) => {
      return AuthRequests.AdminSignIn(data);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["profile"] });
      router.replace("/admin");
    },
    onError: (data) => {
      //! Настроить ошибки
      console.log("MESG", data);
      return setAuthErrorMessage((data as any).response.data.message);
    },
  });

  const clearAuthError = () => setAuthError(null);
  const setAuthErrorMessage = (message: string) => {
    if (message !== authError) {
      setAuthError(message);
    }
  };

  const onFinish = ({ phone, password }: AuthAdminDataType) => {
    const preparedData: AuthAdminDataType = {
      phone: "8" + phone,
      password,
    };
    return mutate(preparedData);
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.title}>Административная панель</div>
        <div className={styles.form}>
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
            {authDataByType.signIn.template}

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
                  title={authDataByType.signIn.btnTitle}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
