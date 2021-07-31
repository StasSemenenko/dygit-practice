import { useHistory } from 'react-router-dom';
import { PageHeader, Form, Input, Button, Upload, message} from 'antd';
import http from '../../services/http';
import { FormItems } from '../../constants/products';

export const ProductAdd = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		console.log('Success:', values);
		try {
			const res = await http.post('/products', values);
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
  
	return (
		<>
			<PageHeader className="site-page-header"
		    	title="Add product">
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
					offset: 11	,
					span: 16,
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