
import Image from "next/image";
import styles from "./galleryItem.module.css";
import Link from "next/link";
import { GalleryItemPropsType } from "./galleryItem";

export const GalleryItemHorizontal = ({
  src,
  title,
  subTitle,
  btnTitle,
  link,
  alternativeStyle
}: GalleryItemPropsType & {alternativeStyle?: boolean}) => {
    return <div className={styles.container}>
      <Image src={src} 
      className={styles.img}
      alt={'gallery-photo'}
      />
      {alternativeStyle ? 
        <h2 className={styles.subTitle}>
          {subTitle}
        </h2> 
      : 
        <h1 className={styles.title}>
          {title}
        </h1>
      }
      
      {alternativeStyle ? 
        <h1 className={styles.title}>
          {title}
        </h1> 
      : 
        <h2 className={styles.subTitle}>
          {subTitle}
        </h2>
      }

      {link ? 
        <Link href={link} className={`${styles.btn} ${alternativeStyle ? styles.btnBackground : ''}`}>
          {btnTitle}
        </Link>
       : ''}
    </div>
}