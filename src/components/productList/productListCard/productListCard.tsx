import styles from "./productListCard.module.css";
import { useState } from "react";
import { ToolBar } from "./toolBar/toolBar";

export type ProductListCardType = {
    id: string,
    title: string,
    price: number,
    photo: string
    priceWithoutDiscount?: number,
    isHot?: boolean
}

export const ProductListCard = ({
    title,
    price,
    // photo,
    priceWithoutDiscount,
    isHot
}: ProductListCardType) => {
    // TODO: Сделать элемент img в Item
    const [toolBarIsHidden , setToolBarIsHidden] = useState(() => false)

    const displayToolBar = () => setToolBarIsHidden(() => true)
    const hideToolBar = () => setToolBarIsHidden(() => false)

    return (
            <div className={styles.container}>
                    {isHot || priceWithoutDiscount ? <div className={styles.status}>{isHot ? 'Популярное' : ''} {Number(priceWithoutDiscount) ? 'Распродажа' : ''}</div> : ''}

                    <div onMouseLeave={hideToolBar} className={styles.imgContainer}>
                        <ToolBar toolBarIsHidden={toolBarIsHidden} />
                        <img onClick={displayToolBar} onMouseOver={displayToolBar} className={styles.photo} alt="example" src='https://landing.engotheme.com/html/jenstore/demo/img/holiday-1.jpg' />
                    </div>
                    

                    <div className={styles.productInfo}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.price}>{`${price} р.`} {Number(priceWithoutDiscount) ? <div className={styles.discountPrice}>{`${priceWithoutDiscount} р.`}</div> : ''}</div>
                    </div>
            </div>
    )
}