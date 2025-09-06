import { Form, Input } from "antd";
import { AuthInputStyle } from "../authForm";

export const SignInFormTemplate = () => {
  return (
    <>
      <Form.Item
        label="Телефон"
        name="phone"
        rules={[
          {
            required: true,
            message: "Некорректный номер телефона",
            max: 10,
            min: 10,
            validateTrigger: "onSubmit",
          },
        ]}
      >
        <Input style={AuthInputStyle} prefix="+7" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Длина пароля должна быть от 6 до 18 символов",
            max: 18,
            min: 6,
          },
        ]}
      >
        <Input.Password style={AuthInputStyle} />
      </Form.Item>
    </>
  );
};
