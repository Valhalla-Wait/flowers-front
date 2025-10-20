import styles from "./itemModal.module.css";
import { Modal } from "antd";

type AddItemModalPropsType = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  confirmLoading: boolean;
  title: string;
  children: React.ReactNode;
};

export const ItemModal = ({
  children,
  title,
  onCancel,
  onOk,
  confirmLoading,
  open,
}: AddItemModalPropsType) => {
  return (
    <div className={styles.container}>
      <Modal
        open={open}
        closable={false}
        onOk={onOk}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        title={title}
      >
        {children}
      </Modal>
    </div>
  );
};
