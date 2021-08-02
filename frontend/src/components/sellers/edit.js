import { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/sellers';


export const SellerEdit = () => {
	const history = useHistory();
	const {id} = useParams();
	const [form] = Form.useForm();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.put(`/sellers/${id}`, values);
			history.push('/sellers');
		}
		catch(e) {
			// const msg = e;
			// = `${e.response.data.error}`;
            // if(e.response.data.errors) {
            //     msg += `${e.response.data.errors.join(', ')}`;
            // }
            // message.error(msg);
			console.log(e);
		}
	};

	const [seller, setSeller] = useState([]);
	const getSeller = async () => {
		const res = await http.get(`/sellers/${id}`);
		setSeller(res.data.seller);
	}
	useEffect(() => {
		getSeller();
	},[]);
	useEffect(() => {
		form.setFieldsValue({
			first_name: seller.first_name,
			last_name: seller.last_name,
			shop_name: seller.shop_name,
			phone_number: seller.phone_number,
			password: seller.password,
			email: seller.email,
			logo: seller.logo
		})
	},[seller])

	return (
		<>
			<PageHeader className="site-page-header" 
		    	title="Edit seller">
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