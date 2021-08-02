import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/customers';

export const CustomerEdit = () => {
	const history = useHistory();
	const {id} = useParams();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.put(`/customers/${id}`, values);
			history.push('/customers');
		}
		catch(e) {
			const msg = `${e.response.data.error}`;
            if(e.response.data.errors) {
                msg += `${e.response.data.errors.join(', ')}`;
            }
            message.error(msg);
		}
	};
  

	const [customer, setCustomer] = useState([]);
	const getCustomer = async () => {
		const res = await http.get(`/customers/${id}`);
		setCustomer(res.data.customer);
	}
	
	useEffect(() => {
		getCustomer();
	},[]);
	useEffect(() => {
		form.setFieldsValue({
			first_name: customer.first_name,
			last_name: customer.last_name,
			email: customer.email,
			phone_number: customer.phone_number,
			city: customer.city,
			address: customer.address,
			zip_code: customer.zip_code,
		})
	},[customer])

	return (
		<>
			<PageHeader className="site-page-header" 
	      		title="Edit customer">
			</PageHeader>
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
						rules={ [{ required: true, message: item.errorMessage }] }>
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
							type="primary" htmlType="submit">
						 	Submit
						</Button>
					</Form.Item>
			</Form>
		</>
	  );
}