"use client";

import { AuthRequests } from "@/core/net/auth";
import { useStore } from "@/core/store/store";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  const { profile, setProfile, setIsProfileLoading } = useStore(
    useShallow(({ profile, setProfile, setIsProfileLoading }) => ({
      profile,
      setProfile,
      setIsProfileLoading,
    }))
  );

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    setIsProfileLoading(isLoading);
    if (!profile && data) {
      setProfile(data);
    }
  }, [data, profile]);

  useEffect(() => {
    if (profile && path === "/auth") {
      router.push("/profile");
    } 
    if (!profile && path === "/profile") {
      router.push("/auth");
    }
  }, [profile, path]);

  // Показываем загрузку до завершения проверки аутентификации
  // TODO: Лоадером закрывать не всю страницу, а отображать его около иконки пользователя, либо вообще его не показывать
  // if (isLoading) {
  //   return <Loader />;
  // }
  
  // if (isError) {
    // Можно перенаправить на страницу входа, но в данном случае просто возвращаем children
    // и пусть компоненты сами решают, что делать с отсутствием профиля
  // }

  return children;
}
