"use client";
import { AuthForm } from "@/components/authForm/authForm";
import styles from "./page.module.css";
import { FEATURES } from "@/core/config/flags";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    if (FEATURES.simplifiedOrderFlowIsEnabled) {
      router.replace("/cart");
    }
  }, []);

  if (FEATURES.simplifiedOrderFlowIsEnabled) {
    return null;
  }

  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
}
