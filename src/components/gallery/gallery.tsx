import Image from "next/image";
import styles from "./gallery.module.css";
import img1 from "../../assets/img/gallery1.jpg"
import img2 from "../../assets/img/gallery2.jpg"
import img3 from "../../assets/img/gallery3.jpg"
import img4 from "../../assets/img/gallery4.jpg"
import { GalleryItemHorizontal } from "./galleryItem/galleryItemHorizontal";

export const Gallery = () => {
  // TODO: Сделать отрисовку элементов через массив
    return <>
        <div className={styles.gallery}>
          <div className={styles.imgContainer1}>
            <GalleryItemHorizontal src={img1} title="Lavender Collections" subTitle="Sale up to 30% off" btnTitle="Read more"/>
            <Image src={img2}  
            className={styles.img}
            alt={""}
            />
          </div>
          <div className={styles.imgContainer2}>
            <Image src={img3}  
            className={styles.img}
            alt={""}
            />
            <Image src={img4}
            className={styles.img}
            alt={""}      />
          </div>
        </div>
        <div className={styles.smallGallery}>
          <div className={styles.smallImgContainer}>
            <Image src={img1} 
            className={styles.img}
            alt={""}
            />
            
          </div>
          <div className={`${styles.smallImgContainer} ${styles.middleImgContainer}`}>
            <Image src={img2}  
            className={styles.img}
            alt={""}
            />
            <Image src={img3}  
            className={styles.img}
            alt={""}
            />
          </div>
          <div className={styles.smallImgContainer}>
            <Image src={img4}
            className={styles.img}
            alt={""}      />
          </div>
        </div>
    </>
}