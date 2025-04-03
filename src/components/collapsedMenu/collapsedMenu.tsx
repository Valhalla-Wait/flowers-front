import { Navbar } from "../navbar/navbar";
import styles from "./collapsedMenu.module.css";
import commonStyles from "../../common/styles/hidden.module.css";

export const CollapsedMenu = ({collapse, toggleCollapse}: {
    collapse: boolean,
    toggleCollapse: () => void
}) => {

    const stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    return (
    <div 
    onClick={toggleCollapse} 
    className={collapse ? `${commonStyles.hidden} ${styles.collapsedMenuContainer}` : styles.collapsedMenuContainer}>
        <div 
        className={styles.collapsedMenu}
        onClick={stopPropagation}>
            <Navbar />
        </div>
    </div>)
}