import { Form, Input, Button, PageHeader, message } from 'antd';
import http from '../../services/http';

export const AuthSignin = () => {
  const onFinish = async (values) => {
    try {
      const res = await http.post('auth/signin', values);
      document.location.pathname = '/';
    } catch (e) {
      const msg = `${e.response.data.error}`;
      if (e.response.data.errors) {
        msg += `${e.response.data.errors.join(', ')}`;
      }
      message.error(msg);
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Login page"
      />
      <Form
        className="Form_signin"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
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
