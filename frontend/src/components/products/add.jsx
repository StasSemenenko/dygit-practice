import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Upload, message, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/products';

export const ProductAdd = () => {
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState();
  const [title, setTitle] = useState();

  const onFinish = async (values) => {
    console.log('Success:', values, image);
    const formData = new FormData();
    for (const name in values) {
      formData.append(name, values[name]);
    }
    formData.append('image', image);
    try {
      if (!id) await http.post('/products', formData);
      else await http.put(`/products/${id}`, formData);
      history.push('/products');
    } catch (e) {
      const msg = `${e.response.data.error}`;
      message.error(msg);
    }
  };

  const getProduct = async () => {
    if (!id) return;
    const res = await http.get(`/products/${id}`);
    setProduct(res.data.product);
    form.setFieldsValue({
      title: res.data.product.title,
      description: res.data.product.description,
      image: res.data.product.image,
      price: res.data.product.price,
    });
  };
  useEffect(() => getProduct(), []);

  const getTitle = async () => {
    const title = '';
    if (!id) setTitle("Add product");
    else setTitle('Edit product');
  };
  useEffect(() => getTitle(), []);

  const handleFile = (event) => {
    setImage(event.file);
    console.log(event);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={title}
        onBack={() => window.history.back()}
      />
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
      >

        {FormItems.map((item, index) => (
          <Form.Item
            key={index}
            label={item.label}
            name={item.name}
            rules={[{ required: true, message: item.errorMessage }]}
          >
            <Input />
          </Form.Item>
        ))}

        <Form.Item
          label="Image"
          valuePropName="fileList"
        >
          <Upload onChange={handleFile} beforeUpload={() => false} name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
