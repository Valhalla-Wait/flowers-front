import { ItemModal } from "./itemModal/itemModal";
import { Form } from "antd";
import { useEffect } from "react";
import { FormFieldType, ItemModalForm } from "./itemModalForm";

export type ProductModalPropsType<T> = {
  itemName: string;
  open: boolean;
  closeModal: () => void;
  callback: (values: T) => void;
  formFields: FormFieldType[];
  isPending: boolean;
  initialValues?: T;
  isEdit?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const ItemModalContainer = <T extends any>({
  itemName,
  open,
  closeModal,
  callback,
  formFields,
  initialValues,
  isPending,
  isEdit,
}: ProductModalPropsType<T>) => {
  const [form] = Form.useForm();

  // Экземпляр формы переиспользуется между открытиями модалки: даже с
  // destroyOnClose значения полей сохраняются в сторе form, поэтому при
  // повторном создании могло остаться старое название. Сбрасываем форму
  // при каждом закрытии (и через onCancel, и через closeModal после onSuccess).
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <ItemModal
      title={`${
        isEdit ? "Редактировать" : "Создать"
      } ${itemName.toLowerCase()}`}
      open={open}
      confirmLoading={isPending}
      onCancel={closeModal}
      onOk={form.submit}
    >
      <ItemModalForm
        form={form}
        formFields={formFields}
        initialValues={initialValues}
        onFinish={callback}
      />
    </ItemModal>
  );
};
