import Link from "next/link";
import styles from "./footer.module.css";
import { CaretRightOutlined } from "@ant-design/icons";
import { useStore } from "@/core/store/store";
import { authNavigationItems, mainNavigationItems } from "../navbar/navbar";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [navItems, setNavItems] = useState(mainNavigationItems);
  const profile = useStore((state) => state.profile);

  // TODO: Дублируется логика с Header, вынести в отдельный компонент
  useEffect(() => {
    if (profile) {
      setNavItems(authNavigationItems);
    } else {
      setNavItems(mainNavigationItems);
    }
  }, [profile]);

  return (
    <footer className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.title}>Меню</div>
        <div className={styles.navbarItems}>
          {navItems.map((item, index) => (
            <div key={index} className={styles.navbarItem}>
              <Link className={styles.link} href={item.href}>
                <div className={styles.arrow}>
                  <CaretRightOutlined />
                </div>
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.contacts}>
        <div>Контактная информация</div>
        <div className={styles.contactsItems}>
          <div>
            Адрес: ул. Котельникова, 1Д, Богородск, Нижегородская область
          </div>
          <div>Телефон: +7 (904) 901-91-98</div>
        </div>
      </div>
    </footer>
  );
};
