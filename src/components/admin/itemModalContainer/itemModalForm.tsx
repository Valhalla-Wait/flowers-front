import { Form, FormInstance, FormItemProps, Input } from "antd";

export type FormFieldType = {
  formProps: FormItemProps;
  children?: React.ReactNode;
};

export type ItemModalFormPropsType<T> = {
  form: FormInstance;
  formFields: FormFieldType[];
  onFinish: (values: T) => void;
  initialValues?: any;
};

export const ItemModalForm = <T extends any>({
  form,
  formFields,
  initialValues,
  ...props
}: ItemModalFormPropsType<T>) => {
  return (
    <Form
      form={form}
      initialValues={initialValues ?? undefined}
      {...props}
      autoComplete="off"
    >
      {formFields.map(({ formProps, children }, i) => (
        <Form.Item {...formProps} key={i}>
          {children ?? <Input />}
        </Form.Item>
      ))}
    </Form>
  );
};
