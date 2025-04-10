import { useEffect, useState } from "react";
import styles from "./pagination.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export const Pagination = ({currentPage, onChange, total }: {
    currentPage: number
    onChange: (pageNumber: number) => void,
    total: number,
    }
) => {
    const [pages, setPages] = useState<{
        label: string,
        pageNumber: number
    }[]>([])

    useEffect(() => {
            const preparedPages: {
                label: string,
                pageNumber: number
            }[] = []
    
            for (let i = 1; i <= total; i++) {
                if(total > 4) {
                    if(i < currentPage) continue
                    else if(i > currentPage + 3) {
                        break
                    }
                }
    
                const str = String(i)
                preparedPages.push({
                    label: str.length === 1 ? `0${i}` : str,
                    pageNumber: i
                })
            }
    
            setPages(() => preparedPages)
    }, [total, currentPage])

    return <div className={styles.container}>
        {total > 4 && currentPage > 1 ? <div onClick={() => onChange(currentPage-1)} className={styles.item}><LeftOutlined /></div> : <></>}

        {pages.map(({label, pageNumber}) => <div onClick={() => onChange(pageNumber)} key={pageNumber} className={currentPage === pageNumber ? styles.itemActive : styles.item}>
            {label}
        </div>)}

        {total > 4 && (total - currentPage) >= 4 ? <div onClick={() => onChange(currentPage+1)} className={styles.item}><RightOutlined /></div> : <></>}
    </div>
}