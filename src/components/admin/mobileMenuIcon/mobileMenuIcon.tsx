import { MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./mobileMenuIcon.module.css";

export const MobileMenuIcon = ({
  toggleCollapse,
}: {
  toggleCollapse: () => void;
}) => (
  <div className={styles.menu}>
    <MenuUnfoldOutlined onClick={toggleCollapse} />
  </div>
);
