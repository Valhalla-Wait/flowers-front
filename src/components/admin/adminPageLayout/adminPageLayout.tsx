import { Content, Header } from "antd/es/layout/layout";
import { MobileMenuIcon } from "../mobileMenuIcon/mobileMenuIcon";
import { AdminCollapsedMenu } from "../adminCollapsedMenu/adminCollapsedMenu";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import styles from "./adminPageLayout.module.css";
import { PlusOutlined } from "@ant-design/icons";

type AdminPageLayoutProps = {
  title: string;
  children: React.ReactNode;
  modal: React.ReactNode;
  openModal: () => void;
};

export const AdminDefaultPageLayout = ({
  title,
  modal,
  openModal,
  children,
}: AdminPageLayoutProps) => {
  const { isCollapse, toggleCollapse } = useMobileMenu();

  return (
    <>
      <AdminCollapsedMenu
        collapse={isCollapse}
        toggleCollapse={toggleCollapse}
      />
      {modal}
      <Header className={styles.header}>
        <MobileMenuIcon toggleCollapse={toggleCollapse} />
        <div>{title}</div>
        <PlusOutlined
          onClick={openModal}
          style={{
            fontSize: 21,
          }}
        />
      </Header>
      <Content className={styles.content}>{children}</Content>
    </>
  );
};
