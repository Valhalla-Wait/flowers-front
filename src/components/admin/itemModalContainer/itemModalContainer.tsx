import { ItemModal } from "./itemModal/itemModal";
import { Form } from "antd";
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
