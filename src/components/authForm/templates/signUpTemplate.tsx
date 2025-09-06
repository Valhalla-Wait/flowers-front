import { Form, Input } from "antd";
import { AuthInputStyle } from "../authForm";

export const SignUpFormTemplate = () => {
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
      <Form.Item
        name="confirm"
        label="Повторите пароль"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Необходимо повторить пароль",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают!"));
            },
          }),
        ]}
      >
        <Input.Password style={AuthInputStyle} />
      </Form.Item>
    </>
  );
};
