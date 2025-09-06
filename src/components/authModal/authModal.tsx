import styles from "./authModal.module.css";
import { CloseBtn } from "../closeBtn/closeBtn";
import Link from "next/link";

type PropsType = {
  close: () => void;
};

export const AuthModal = ({ close }: PropsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.closeBtn}>
          <CloseBtn callback={close} />
        </div>
        {/* // TODO Вынести стили */}
        <div className={styles.text}>
          Необходимо{" "}
          <Link
            style={{
              color: "black",
              textDecoration: "underline",
              // fontWeight: "bold",
            }}
            href="/auth"
          >
            Войти/Зарегистрироваться
          </Link>
          ,<br /> чтобы оформить заказ
        </div>
      </div>
    </div>
  );
};
