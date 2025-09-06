import Image, { StaticImageData } from "next/image";
import styles from "./galleryItem.module.css";
import img1 from "../../assets/img/gallery1.jpg";
import Link from "next/link";
import { GalleryItemPropsType } from "./galleryItem";

export const GalleryItemDefault = ({
  src,
  title,
  subTitle,
  btnTitle,
  btnHaveBackground,
  link,
}: GalleryItemPropsType) => {
  return (
    <div>
      <Image src={src} className={styles.img} alt={"gallery-photo"} />
      {title ? <div className={styles.title}>{title}</div> : ""}

      {subTitle ? <div className={styles.subTitle}>{subTitle}</div> : ""}

      {link ? (
        <Link
          href={link}
          className={`${styles.btnTitle} ${
            btnHaveBackground ? styles.btnBackground : ""
          }`}
        >
          {btnTitle}
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};
