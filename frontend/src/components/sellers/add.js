import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/sellers';

export const SellerAdd = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.post('/auth/signup', values);
			history.push('/sellers');
		}
		catch(e) {
			const msg = `${e.response.data.error}`;
			message.error(msg);
		}
	};

	return (
		<>
			<PageHeader className="site-page-header" 
		    	title="Add seller">
			</PageHeader>
			<Form 
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