import styles from "./adminCollapsedMenu.module.css";
import commonStyles from "../../../common/styles/hidden.module.css";
import AdminNavbar from "../adminNavbar/adminNavbar";

// TODO: Логика дублируется с меню у пользователей, вынести
export const AdminCollapsedMenu = ({
  collapse,
  toggleCollapse,
}: {
  collapse: boolean;
  toggleCollapse: () => void;
}) => {
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={toggleCollapse}
      className={
        collapse
          ? `${commonStyles.hidden} ${styles.collapsedMenuContainer}`
          : styles.collapsedMenuContainer
      }
    >
      <div className={styles.collapsedMenu} onClick={stopPropagation}>
        <AdminNavbar />
      </div>
    </div>
  );
};
