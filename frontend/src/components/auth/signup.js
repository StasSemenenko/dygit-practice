import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message, PageHeader} from 'antd';
import  './auth.css';
import http from '../../services/http';


export const AuthSignup = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.post('/auth/signup', values);
			history.push('/products');
		}
		catch(e) {
			const msg = `${e.response.data.error}: ${e.response.data.errors.join(', ')}`;
			message.error(msg);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

    return (
		<PageHeader
	    	className="site-page-header" 
	    	title="Registration"
	    	// subTitle="This is a subtitle"
  		>
        <Form className='Form_signup'
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 7 }}
		
        initialValues={{ remember: true }}
		onFinish={onFinish}
		onFinishFailed={onFinishFailed}
        >
        <Form.Item 
            label="First name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
        >
            <Input />
        </Form.Item>

		<Form.Item
            label="Last name"
            name="last_name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
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

		<Form.Item
            label="Shop name"
            name="shop_name"
            rules={[{ required: true, message: 'Please input your shop name!' }]}
        >
            <Input />
        </Form.Item>

		<Form.Item
            label="Phone number"
            name="phone_number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
            <Input />
        </Form.Item>

		<Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input />
        </Form.Item>

		<Form.Item
            label="Logo"
            name="logo"
            rules={[{ required: true, message: 'Please input your logo!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
		</PageHeader>
    );
};