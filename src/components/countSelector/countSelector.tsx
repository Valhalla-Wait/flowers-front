import styles from "./countSelector.module.css";
import Selector from "@/app/catalog/[id]/selector/selector";
import { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
  count: number;
  setCount: (count: number) => void;
  withDescription?: boolean;
};

// TODO: Блокировать кнопку уменьшения если кол-во = 0
export const CountSelector = ({
  count,
  setCount,
  withDescription = true,
}: PropsType) => {
  const increment = () => setCount(count + 1);
  const decrement = () => {
    const newValue = count - 1;
    if (newValue >= 0) {
      setCount(newValue);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 3 && Number.isInteger(Number(value))) {
      const preparedValue = Number(event.target.value);
      setCount(preparedValue);
    }
  };

  return (
    <div className={styles.container}>
      {withDescription ? "Кол-во: " : <></>}
      <Selector
        count={count}
        onChange={onChange}
        increment={increment}
        decrement={decrement}
      />
    </div>
  );
};
