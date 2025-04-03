"use client"
import { Gallery } from "@/components/gallery/gallery";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      {/* <Slider /> */}
      <Gallery />
    </div>
  );
}
