"use client";
import { Card, Popconfirm, Button } from "antd";
import Meta from "antd/es/card/Meta";
import { DeleteOutlined } from "@ant-design/icons";

export default function TagCard({
  id,
  title,
  startEdit,
  onDelete,
}: {
  id: string;
  title: string;
  startEdit: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card
      onClick={startEdit}
      hoverable
      style={{
        minWidth: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Meta style={{ fontSize: "16px" }} title={title} />
        <div
          style={{
            display: "flex",
            justifyItems: "start",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Popconfirm
            title="Удалить тег?"
            description="Вы уверены, что хотите удалить этот тег?"
            onConfirm={(e) => {
              e?.preventDefault();
              e?.stopPropagation();
              onDelete(id);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              style={{
                fontSize: "21px",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
}
