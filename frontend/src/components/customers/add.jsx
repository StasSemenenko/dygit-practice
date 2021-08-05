import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Upload, message } from 'antd';
import http from '../../services/http';
import { FormItems } from '../../constants/customers';

export const CustomerAdd = () => {
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [customer, setCustomer] = useState([]);
  const [title, setTitle] = useState();

  const onFinish = async (values) => {
    try {
      if (!id) await http.post('/customers', values);
      else await http.put(`/customers/${id}`, values);
      history.push('/customers');
    } catch (e) {
      const msg = `${e.response.data.error}: ${e.response.data.errors.join(', ')}`;
      message.error(msg);
    }
  };

  const getCustomer = async () => {
    if (!id) return;
    const res = await http.get(`/customers/${id}`);
    setCustomer(res.data.customer);
    form.setFieldsValue({
      first_name: res.data.customer.first_name,
      last_name: res.data.customer.last_name,
      email: res.data.customer.email,
      phone_number: res.data.customer.phone_number,
      city: res.data.customer.city,
      address: res.data.customer.address,
      zip_code: res.data.customer.zip_code,
    });
  };
  useEffect(() => getCustomer(), []);

  const getTitle = async () => {
    const title = '';
    if (!id) setTitle("Add customer");
    else setTitle('Edit customer');
  };
  useEffect(() => getTitle(), []);

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
          wrapperCol={{
            offset: 8,
            span: 8,
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
