"use client";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Upload } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";

type CreateProductFieldType = {
  title: string;
  price: number;
  photo: any[];
};

// const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => resolve(reader.result);
//   reader.onerror = reject;
// });

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<CreateProductFieldType>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

const createProductQuery = async (data: CreateProductFieldType) => {
  try {
    // await fetch('http://localhost:8888/api/auth/sign-in',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json;charset=utf-8'
    //     },
    //     body: JSON.stringify({
    //       password: "123456"
    //     })
    //   }
    // );

    console.log("DATA", data);

    await axios.post(
      "http://localhost:8888/api/auth/sign-in",
      {
        password: "123456",
      },
      {
        withCredentials: true,
      }
    );

    // const photo = await toBase64(data.photo[0])

    const response = await axios.post(
      "http://localhost:8888/api/products",
      { ...data, price: Number(data.price), photo: data.photo[0].thumbUrl },
      {
        withCredentials: true,
      }
    );

    const result = await response.data;
    console.log("SUCCESS", result);
    return result.data;
  } catch (error) {
    console.log("FAILED", error);
  }
};

export default function CreateProductPage() {
  // const { data: products, isLoading, isError } = useQuery<any[]>({
  //   queryKey: ['products'],
  //   queryFn: () => fetchData(),
  // })

  const { isPending, isError, isSuccess, error, mutate } = useMutation({
    mutationFn: (data: CreateProductFieldType) => {
      return createProductQuery(data);
    },
  });

  const [form] = Form.useForm();

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          color: "white",
        }}
      >
        <div>Create Product</div>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
        }}
      >
        <Form
          form={form}
          disabled={isPending}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={(values: CreateProductFieldType) => {
            mutate(values);
          }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<CreateProductFieldType>
            label="Название"
            name="title"
            rules={[{ required: true, message: "Необходимо указать название" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CreateProductFieldType>
            label="Цена"
            name="price"
            rules={[{ required: true, message: "Необходимо указать цену" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CreateProductFieldType>
            label="Фото"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="photo"
          >
            <Upload listType="picture-card">
              <button
                style={{
                  color: "inherit",
                  cursor: "inherit",
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Создать продукт
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}
