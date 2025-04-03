import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Link from "next/link";

const navItems = [
    {
        title: 'Главная',
        href: '/',
    },
    {
        title: 'Каталог',
        href: '/catalog',
    },
    {
        title: 'О нас',
        href: '/about',
    },
    {
        title: 'Контакты',
        href: '/contacts',
    }
]

export const Navbar = (props?: {
    additionalStyle?: string
}) => {
    const path = usePathname()

    return <div className={props?.additionalStyle ? `${props.additionalStyle} ${styles.navbar}` : styles.navbar}>
        {navItems.map((item, index) => (
            <div key={index} className={styles.navbarItem}>
                <div className={path === item.href ? `${styles.active} ${styles.navbarItemText}` : styles.navbarItemText}>
                    <Link href={item.href}>{item.title}</Link>
                </div>
            </div>))}
        {/* <div className={styles.navbarItem}>
            <div className={styles.navbarItemText}><Link href="/">Главная</Link></div>
        </div>
        <div className={`${styles.active} ${styles.navbarItem}`}>
            <div className={styles.navbarItemText}><Link href="/catalog">Каталог</Link></div>
        </div>
        <div className={styles.navbarItem}>
            <div className={styles.navbarItemText}>О нас</div>
        </div>
        <div className={styles.navbarItem}>
            <div className={styles.navbarItemText}>Контакты</div>
        </div> */}
    </div>
}