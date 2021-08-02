import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message, Select, Space } from 'antd';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/orders';

export const OrderEdit = () => {
	const history = useHistory();
	const {id} = useParams();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.put(`/orders/${id}`, values);
			history.push('/orders');
		}
		catch(e) {
			const msg = `${e.response.data.error}`;
            if(e.response.data.errors) {
                msg += `${e.response.data.errors.join(', ')}`;
            }
            message.error(msg);
		}
	};

	const [order, setOrder] = useState([]);
	const getOrder = async () => {
		const res = await http.get(`/orders/${id}`);
		setOrder(res.data.order);
	}

	useEffect(() => {
		getOrder();
	},[]);
	useEffect(() => {
		form.setFieldsValue({
			customer: order.customer?.first_name,
			products: order.products,
			status: order.status,
			amount: order.amount,
		})
	},[order])

	return (
		<>
			<PageHeader className="site-page-header" 
	     		title="Edit order">
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
					<Form.Item
						label="customer"
						name="customer"
						rules={ [{ required: true, message: "Please input customer!" }] }>
						<Input />
					</Form.Item>

					<Form.Item
						label="product"
						name="product"
						rules={ [{ required: true, message: "Please input product!" }] }>
						<Input />
					</Form.Item>

					<Form.Item
						label="quantity"
						name="quantity"
						rules={ [{ required: true, message: "Please input quantity!" }] }>
						<Input />
					</Form.Item>

					<Form.Item
						label="status"
						name="status"
						rules={ [{ required: true, message: "Please input customer!" }] }>
						<Input />
					</Form.Item>

					<Form.Item
						label="amount"
						name="amount"
						rules={ [{ required: true, message: "Please input amount!" }] }>
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
		</>
	  );
}