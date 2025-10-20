"use client";
import { AuthForm } from "@/components/authForm/authForm";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthRequests } from "@/core/net/auth";
import { useQuery } from "@tanstack/react-query";

export default function Auth() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (profile) {
      router.push("/profile");
    }
  }, [profile]);
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
}
