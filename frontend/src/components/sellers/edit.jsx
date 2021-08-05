import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Upload, message, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { FormItems } from '../../constants/sellers';

export const SellerEdit = () => {
	const history = useHistory();
	const { id } = useParams();
	const [form] = Form.useForm();
	const [profile, setProfile] = useState([]);
	const [image, setImage] = useState();

	const onFinish = async (values) => {
		const formData = new FormData();
		for (const name in values) {
			if (values[name]) formData.append(name, values[name]);
		}
		if (image) formData.append('image', image);
		try {
			const res = await http.put('/sellers/profile', formData);
			history.push('/');
		} catch (e) {
			const msg = `${e.response.data.error}`;
			message.error(msg);
		}
	};

	const getProfile = async () => {
		const res = await http.get('/sellers/profile');
		setProfile(res.data.profile);
	};
	useEffect(() => {
		getProfile();
	}, []);
	useEffect(() => {
		form.setFieldsValue({
			first_name: profile.first_name,
			last_name: profile.last_name,
			shop_name: profile.shop_name,
			phone_number: profile.phone_number,
			password: profile.password,
			email: profile.email,
			logo: profile.logo,
		});
	}, [profile]);

	const handleFile = (event) => {
		setImage(event.file);
	};

	return (
		<>
			<PageHeader
				className="site-page-header"
				title="Settings"
				onBack={() => window.history.back()}
			/>
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
						rules={[{ required: true, message: item.errorMessage }]}
					>
						<Input />
					</Form.Item>
				))}

				<Form.Item
					initialValues=''
					label='Password'
					name='password'
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Logo"
					valuePropName="fileList"
				>
					<Upload onChange={handleFile} beforeUpload={() => false} name="logo" listType="picture">
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 8,
					}}
				>
					<Button
						type="primary"
						htmlType="submit"
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
