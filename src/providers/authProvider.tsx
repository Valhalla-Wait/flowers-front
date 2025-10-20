"use client";

import { AuthRequests } from "@/core/net/auth";
import { Roles } from "@/core/net/types";
import { useStore } from "@/core/store/store";
import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { Loader } from "@/components/loader";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { profile, setProfile, setIsProfileLoading } = useStore(
    useShallow(({ profile, setProfile, setIsProfileLoading }) => ({
      profile,
      setProfile,
      setIsProfileLoading,
    }))
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
  });

  // const path = usePathname();

  useEffect(() => {
    setIsProfileLoading(isLoading);
    if (!profile && data) {
      setProfile(data);
    }
  }, [data, isLoading, profile]);

  // if (profile && path === "/auth") {
  //   router.push("/profile");
  // } else if (!profile && path === "/profile") {
  //   router.push("/auth");
  // }

  // Показываем загрузку до завершения проверки аутентификации
  if (isLoading) {
    return <Loader />;
  }

  // Если произошла ошибка при загрузке профиля, значит пользователь не авторизован
  if (isError) {
    // Можно перенаправить на страницу входа, но в данном случае просто возвращаем детей
    // и пусть компоненты сами решают, что делать с отсутствием профиля
  }

  return children;
}
