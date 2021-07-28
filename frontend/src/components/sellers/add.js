import http from '../../services/http';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const SellersAdd = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};
  
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const [sellers, setSellers] = useState([]);
	const postSellers = async () => {
		const res = await http.post('/sellers');
		setSellers(res.data.sellers);
	}
	useEffect(() => {
		postSellers();
	},[]);

	return (
		<PageHeader className="site-page-header" style={style.border}
	    	onBack={() => null}
	    	title="Add seller">
		<Form style={style.border}
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 8,
			}}
			initialValues={{
				remember: true,
			}}
		  	onFinish={onFinish}
		  	onFinishFailed={onFinishFailed}
		>

			<Form.Item style={style.input}
				label="First name"
				name="first_name"
				rules={[
					{
					required: true,
					message: 'Please input first name!',
				},
				]}
			>
				<Input />
			</Form.Item>
	
			<Form.Item
				label="Last name"
				name="last_name"
				rules={[
					{
						required: true,
						message: 'Please input last name!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
		        name="shop_name"
		        label="Shop name"
                rules={[
					{
						required: true,
						message: 'Please input shop name!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Phone number"
				name="phone_number"
				rules={[
				{
					required: true,
					message: 'Please input phone number!',
				},
				]}
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="Password"
				name="password"
				rules={[
				{
					required: true,
					message: 'Please input password!',
				},
				]}
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="Email"
				name="email"
				rules={[
				{
					required: true,
					message: 'Please input email!',
				},
				]}
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="Logo"
				name="logo"
                valuePropName="fileList"
                >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
                </Form.Item>
		
			<Form.Item
				wrapperCol={{
				offset: 8,
				span: 8,
				}}
			>
				<Button
					type="primary" htmlType="submit">
					Submit
				</Button>
		  	</Form.Item>
		</Form>
		</PageHeader>
	  );
}