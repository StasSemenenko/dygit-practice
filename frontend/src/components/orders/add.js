import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/orders';

export const OrderAdd = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.post('/orders', values);
			history.push('/orders');
		}
		catch(e) {
			// const msg = `${e.response.data.error}: ${e.response.data.errors.join(', ')}`;
			// message.error(msg);
		}
	};
	const [products, setProducts] = useState([]);

	const getProducts = async () => {
		const prod = await http.get('/products');
		console.log(prod.data.products[0].title)
		setProducts(prod.data.products);
	}

	useEffect(() => {
		getProducts();
	},[]);
	
	
	const { Option } = Select;

	function onChange(value) {
	  console.log(`selected ${value}`);
	}

	function onBlur() {
	  console.log('blur');
	}

	function onFocus() {
	  console.log('focus');
	}

	function onSearch(val) {
	  console.log('search:', val);
	}
  
	return (
		<>
			<PageHeader className="site-page-header" 
		    	title="Add order">
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

				<Select
				    showSearch
				    style={{ width: 200 }}
				    placeholder="Select a product"
				    optionFilterProp="children"
				    onChange={onChange}
				    onFocus={onFocus}
				    onBlur={onBlur}
				    onSearch={onSearch}
				    filterOption={(input, option) =>
				      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				    }
				>
				    {/* <Option value={prod.data.products[0].title}>{prod.data.products[0].title}</Option> */}

				</Select>
				
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