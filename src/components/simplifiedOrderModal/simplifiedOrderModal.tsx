"use client";
import styles from "./simplifiedOrderModal.module.css";
import { CloseBtn } from "../closeBtn/closeBtn";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { OrdersRequests } from "@/core/net/orders";
import { useStore } from "@/core/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type PropsType = {
  close: () => void;
};

export const SimplifiedOrderModal = ({ close }: PropsType) => {
  const [phone, setPhone] = useState("");
  const tempCart = useStore((state) => state.tempCart);
  const clearTempCart = useStore((state) => state.clearTempCart);
  const router = useRouter();

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: () =>
      OrdersRequests.createSimplifiedOrder({
        phone,
        products: tempCart.productsData,
      }),
    onSuccess: () => {
      const setCookie = (cart: any) =>
        Cookies.set("tempCart", JSON.stringify(cart));
      clearTempCart(setCookie);
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      mutate();
    }
  };

  const submitBtnDisabled =
    isPending || phone.replace(/\D/g, "").length < 11;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.closeBtn}>
          <CloseBtn callback={close} />
        </div>

        {isSuccess ? (
          <>
            <div className={styles.text}>Заказ успешно оформлен!</div>
            <button
              onClick={() => router.push("/orders")}
              className={styles.actionBtn}
            >
              Перейти к заказам
            </button>
          </>
        ) : (
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.text}>
              <p>Оставьте номер телефона для связи</p>
              <p className={styles.textSmall}>(Мы позвоним для уточнения деталей доставки)</p>
            </div>

            <input
              className={styles.phoneInput}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                let formatted = "";
                if (digits.length > 0) formatted = "+7";
                if (digits.length >= 2) formatted += " (" + digits.slice(1, 4);
                if (digits.length >= 5) formatted += ") " + digits.slice(4, 7);
                if (digits.length >= 8) formatted += "-" + digits.slice(7, 9);
                if (digits.length >= 10)
                  formatted += "-" + digits.slice(9, 11);
                setPhone(formatted);
              }}
              disabled={isPending}
              required
            />

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <button
                type="submit"
                className={styles.actionBtn}
                disabled={submitBtnDisabled}
              >
                {isPending ? "Оформление..." : "Подтвердить заказ"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
