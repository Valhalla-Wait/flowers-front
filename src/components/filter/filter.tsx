import styles from "./navbar.module.css";

type PropsType = {
    title: string
    items: PropsItemType[]
}

type PropsItemType = {
    id: number,
    title: string
}

export const Filter = ({title}: PropsType) => {
//   const [isOpen, setOpen] = useState(false);
//   const [selectedItemIds, setSelectedItemIds] = useState<number[]>(() => []); 

//   const selectItem = (id: number) => setSelectedItemIds([...selectedItemIds, id])

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            {title}
        </div>
        <div className={styles.items}>
            {/* {items.map(({id, title}) => )} */}
        </div>
    </div>
  );
};

// const FilterItem = ({id, title, isSelected}: PropsItemType & { isSelected: boolean }) => {
//     return <div className={styles.item} key={id}>{title}</div>
// }