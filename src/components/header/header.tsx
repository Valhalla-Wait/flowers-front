import { Navbar } from "../navbar/navbar";
import styles from "./header.module.css";
import commonStyle from "../../common/styles/hidden.module.css";
import { Userbar } from "../userbar/userbar";

export const Header = ({
  toggleCollapsedMobileMenu,
}: {
  toggleCollapsedMobileMenu: () => void;
}) => {
  return (
    <div className={styles.header}>
      <div>LOGOTYPE</div>
      <Navbar additionalStyle={commonStyle.mobileHidden} />
      <Userbar toggleCollapsedMobileMenu={toggleCollapsedMobileMenu} />
    </div>
  );
};
