import { Form, Input, Button, Checkbox } from 'antd';
import http from '../../services/http';
import { useEffect, useState } from 'react';


export const AuthSignin = () => {
    const [signin, setSignin] = useState([]);
	const postSignin = async () => {
		// const res = await Axios.post('/auth/signin', {  email: 'stanislavsemenenko@gmail.com', password: '123465' });
		const res = await http.post('/auth/signin');
		setSignin(res.data.signin);
	}
	useEffect(() => {
		postSignin();
	},[]);
    return (
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        >
        <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};