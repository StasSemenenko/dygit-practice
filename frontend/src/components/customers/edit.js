import http from '../../services/http';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const CustomersEdit = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};
  
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const [customers, setCustomers] = useState([]);
	const getCustomers = async () => {
		const res = await http.get('/customers');
		setProducts(res.data.customers);
	}
	useEffect(() => {
		getCustomers();
	},[]);

	return (
		<PageHeader className="site-page-header" style={style.border}
    		onBack={() => null}
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
				label="Name"
				name="name"
				rules={[
					{
						required: true,
						message: 'Please input product name!',
					},
				]}
			>
				<Input />
			</Form.Item>
	
			<Form.Item
				label="Description"
				name="description"
				rules={[
					{
						required: true,
						message: 'Please input description!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
		        name="upload"
		        label="Upload"
		        valuePropName="fileList"
	        	// getValueFromEvent={normFile}
	    	>
	        	<Upload name="logo" action="/upload.do" listType="picture">
	        		<Button icon={<UploadOutlined />}>Click to upload</Button>
	        	</Upload>
	    	</Form.Item>

			<Form.Item
				label="Price"
				name="price"
				rules={[
					{
						required: true,
						message: 'Please input price!',
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