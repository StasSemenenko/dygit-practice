import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Upload, message, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/signup';

export const AuthSignup = () => {
  const history = useHistory();
  const [image, setImage] = useState();

  const onFinish = async (values) => {
    console.log('Success:', values, image);
    const formData = new FormData();
    for (const name in values) {
      formData.append(name, values[name]);
    }
    formData.append('image', image);
    try {
      const res = await http.post('/auth/signup', formData);
      history.push('/auth/signin');
    } catch (e) {
      const msg = `${e.response.data.error}`;
      message.error(msg);
    }
  };

  const handleFile = (event) => {
    setImage(event.file);
    console.log(event);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Registration"
      />
      <Form
        className="Form_signup"
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 7 }}

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

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
