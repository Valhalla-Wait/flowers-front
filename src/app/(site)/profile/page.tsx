"use client";
import styles from "./page.module.css";
import { AuthRequests } from "@/core/net/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlackActionBtn } from "@/components/blackActionBtn/blackActionBtn";
import { useStore } from "@/core/store/store";
import { useShallow } from "zustand/shallow";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FEATURES } from "@/core/config/flags";

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    if (FEATURES.simplifiedOrderFlow) {
      router.replace("/orders");
    }
  }, []);

  if (FEATURES.simplifiedOrderFlow) {
    return null;
  }

  // TODO: Возможно zustand не нужен, тк react-query кеширует и можно тупо делать запросы
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
  });

  const { setProfile } = useStore(
    useShallow(({ setProfile }) => ({
      setProfile,
    }))
  );

  const { mutate } = useMutation({
    mutationFn: AuthRequests.Logout,
    onSuccess: () => {
      setProfile(null);
      queryClient.resetQueries({ queryKey: ["profile"] });
    },
  });

  const queryClient = useQueryClient();

  const logout = () => mutate();


  useEffect(() => {
    if (!profile) {
      router.push("/auth");
    }
  }, [profile]);

  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div>Профиль</div>
        {profile ? (
          <div className={styles.info}>
            <div>Телефон: {profile?.phone}</div>
            <div>Имя: {profile?.firstName}</div>
            <div>Фамилия: {profile?.lastName}</div>
            <div onClick={logout}>Выйти из аккаунта</div>
            {/* <BlackActionBtn title="Выйти из аккаунта" /> */}
          </div>
        ) : (
          "Вы не зарегистрированы"
        )}
      </div>
    </div>
  );
}
