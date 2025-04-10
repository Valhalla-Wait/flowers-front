import Link from "next/link";
import styles from "./customLink.module.css";
import { ReactNode } from "react";

export const CustomLink = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <Link className={styles.link} href={href}>
      {children}
    </Link>
  );
};
