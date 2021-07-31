import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
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
			customer: order.customer,
			products: order.products,
			quantity: order.quantity,
			status: order.pricstatuse,
			amount: order.amount,
		})
	},[order])

	return (
		<>
			<PageHeader className="site-page-header" 
	     		title="Edit order">
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