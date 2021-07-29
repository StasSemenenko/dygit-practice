import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/customers';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const CustomersAdd = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.post('/customers', values);
			history.push('/customers');
		}
		catch(e) {
			const msg = `${e.response.data.error}: ${e.response.data.errors.join(', ')}`;
			message.error(msg);
		}
	};

	return (
		<PageHeader className="site-page-header" style={style.border}
	    	onBack={() => null}
	    	title="Add customer">
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
		</PageHeader>
	);
}