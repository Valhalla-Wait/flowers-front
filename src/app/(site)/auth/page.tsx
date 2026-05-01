"use client";
import { AuthForm } from "@/components/authForm/authForm";
import styles from "./page.module.css";

export default function Auth() {
  return (
    <div className={styles.container}>
      <AuthForm />
    </div>
  );
}
