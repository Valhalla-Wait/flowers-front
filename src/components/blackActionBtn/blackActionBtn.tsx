import Link from "next/link";
import styles from "./blackActionBtn.module.css";
import {
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

type BlackActionBtnPropsType = {
  title: string | ReactNode;
  link: string;
  callback?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
};

export const BlackActionBtn = ({
  title,
  link,
  callback,
  style,
  disabled,
}: BlackActionBtnPropsType) => {
  return (
    <Link href={link}>
      <button disabled={disabled} onClick={callback}>
        <div className={styles.container} style={style}>
          {title}
        </div>
      </button>
    </Link>
  );
};
