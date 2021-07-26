import http from '../../services/http';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const OrdersAdd = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};
  
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const [orders, setOrders] = useState([]);
	const postOrders = async () => {
		const res = await http.post('/orders');
		setOrders(res.data.orders);
	}
	useEffect(() => {
		postOrders();
	},[]);

	return (
		<PageHeader className="site-page-header" style={style.border}
	    	onBack={() => null}
	    	title="Add product">
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
				label="order_number"
				name="order_number"
				rules={[
			  	{
					required: true,
					message: 'Please input order number!',
				},
				]}
		 	>
				<Input />
			</Form.Item>
		
			<Form.Item
				label="customer"
				name="customer"
				rules={[
					{
						required: true,
						message: 'Please input customer!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
		        name="products"
		        label="products"
		        rules={[
					{
						required: true,
						message: 'Please input products!',
					},
				  ]}
		    >
		    </Form.Item>

			<Form.Item
				label="quantity"
				name="quantity"
				rules={[
					{
						required: true,
						message: 'Please input quantity!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="amount"
				name="amount"
				rules={[
					{
						required: true,
						message: 'Please input amount!',
					},
				]}
			>
				<Input />
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