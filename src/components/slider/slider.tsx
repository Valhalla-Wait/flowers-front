import { Carousel } from "antd";
import styles from "./slider.module.css";
import Image from "next/image";
import img1 from "../../assets/img/slider1.jpg"
import img2 from "../../assets/img/slider2.jpg"

export const Slider = () => {
    return <div className={styles.slider}>
       <Carousel autoplay >
        <Image src={img1} 
        layout="fill"
        // objectFit="cover"
        // width={1920} height={700}
         alt=""  />
        <Image src={img2} 
        // width={1920} height={700}
        layout="fill"
        //  objectFit="cover"
         alt=""  />
  </Carousel>
    </div>
}