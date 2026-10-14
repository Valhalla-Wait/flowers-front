"use client";
import TagCard from "@/components/admin/tagCard/tagCard";
import { TagsRequests } from "@/core/net/tags";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { List, message } from "antd";
import { useState } from "react";
import { AdminDefaultPageLayout } from "@/components/admin/adminPageLayout/adminPageLayout";
import { MetaType, TagType } from "@/core/net/types";
import { ItemModalContainer } from "@/components/admin/itemModalContainer/itemModalContainer";
import { FormFieldType } from "@/components/admin/itemModalContainer/itemModalForm";

export type EditTagType = {
  id: string;
  title: string;
} | null;

const pageSize = 20;

const formFields: FormFieldType[] = [
  {
    formProps: {
      label: "Название",
      name: "title",
      rules: [{ required: true, message: "Необходимо указать название" }],
    },
  },
];

export default function TagsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setOpenModal] = useState(false);
  const [editTag, setEditTag] = useState<EditTagType>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // TODO: Рефакторинг
  const alertSuccessMsg = () => {
    messageApi.open({
      type: "success",
      content: `Тег успешно ${editTag ? "изменен" : "создан"}`,
    });
  };

  const alertErrorMsg = () => {
    messageApi.open({
      type: "error",
      content: `Не удалось ${editTag ? "изменить" : "создать"} тег`,
    });
  };

  const openModal = () => setOpenModal(true);
  const closeModal = () => {
    setOpenModal(false);
    setEditTag(null);
  };
  const openEditModal = (tag: any) => {
    openModal();
    setEditTag(tag);
  };

  const queryClient = useQueryClient();

  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery<{
    list: TagType[];
    meta: MetaType;
  }>({
    queryKey: ["tags", currentPage],
    queryFn: () => TagsRequests.get(currentPage, pageSize),
    retry: false,
    refetchOnMount: false,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ title }: any) =>
      editTag
        ? TagsRequests.update(editTag?.id, { title })
        : TagsRequests.create({ title }),
    // TODO: Вынести инвалидацию кэша в утилиту, логика дублируется между страницами
    onSuccess: () => {
      // Теги используются в опциях фильтров и формах товаров, поэтому обновляем их и списки товаров
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alertSuccessMsg();
      closeModal();
    },
    onError: alertErrorMsg,
  });

  const { mutate: deleteTag } = useMutation({
    mutationFn: (id: string) => TagsRequests.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      messageApi.open({
        type: "success",
        content: "Тег успешно удален",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Не удалось удалить тег",
      });
    },
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {contextHolder}
      <AdminDefaultPageLayout
        title="Теги"
        openModal={openModal}
        modal={
          <ItemModalContainer
            itemName="Тег"
            // ? Ключ необходим для обновления полей формы, тк по дефолту форма после монтирования не изменяется
            key={editTag?.id}
            isEdit={Boolean(editTag)}
            isPending={isPending}
            callback={mutate}
            initialValues={editTag}
            formFields={formFields}
            open={isOpenModal}
            closeModal={closeModal}
          />
        }
      >
        <List
          pagination={{
            onChange: (page) => setCurrentPage(page),
            pageSize,
            position: "bottom",
            align: "center",
            total: tags?.meta.total,
          }}
          dataSource={tags?.list}
          loading={isLoading}
          renderItem={(tagData) => (
            <List.Item>
              <TagCard
                {...tagData}
                startEdit={() => openEditModal(tagData)}
                onDelete={deleteTag}
              />
            </List.Item>
          )}
        />
      </AdminDefaultPageLayout>
    </>
  );
}
