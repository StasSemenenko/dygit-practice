import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../services/http';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const CustomersEdit = () => {
	const {id} = useParams();

	const onFinish = (values) => {
		console.log('Success:', values);
	};
  
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const [customers, setCustomers] = useState([]);
	const getCustomers = async () => {
		const res = await http.get('/customers');
		setCustomers(res.data.customers);
	}
	const [customer, setCustomer] = useState([]);
	const getCustomer = async () => {
		const result = await http.post('/customers/edit/' + id);
		setCustomer(result.data.customer);
	}
	
	useEffect(() => {
		getCustomers();
		getCustomer();
	},[]);

	return (
		<PageHeader className="site-page-header" style={style.border}
      		title="Edit customer">
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
					label="first_name"
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
					label="last_name"
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
			        name="email"
			        label="email"
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
					label="phone_number"
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
					label="city"
					name="city"
					rules={[
						{
							required: true,
							message: 'Please input city!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="address"
					name="address"
					rules={[
						{
							required: true,
							message: 'Please input address!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="zip_code"
					name="zip_code"
					rules={[
						{
							required: true,
							message: 'Please input zip code!',
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