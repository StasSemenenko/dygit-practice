import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/products';


export const ProductEdit = () => {
	const history = useHistory();
	const {id} = useParams();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.put(`/products/${id}`, values);
			history.push('/products');
		}
		catch(e) {
			const msg = `${e.response.data.error}`;
            if(e.response.data.errors) {
                msg += `${e.response.data.errors.join(', ')}`;
            }
            message.error(msg);
		}

	};
  
	const [product, setProduct] = useState([]);
	const getProduct = async () => {
		const res = await http.get(`/products/${id}`);
		setProduct(res.data.product);
	}
	useEffect(() => {
		getProduct();
	},[]);
	useEffect(() => {
		form.setFieldsValue({
			title: product.title,
			description: product.description,
			image: product.image,
			price: product.price,
		})
	},[product])

	return (
		<>
			<PageHeader className="site-page-header" 
		    	title="Edit product">
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