import { useEffect, useState,} from 'react';
import { useHistory } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, message, Select, Space } from 'antd';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { OptionItem } from '../../components/Options/options';

export const OrderAdd = () => {
	const history = useHistory();

	const onFinish = async (values) => {
		// console.log('Received values of form:', values);
		console.log('Success:', values);
		try {
			values.amount = totalAmount;
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
		const res = await http.get('/products');
		// console.log(res.data.products);
		setProducts(res.data.products);
	}

	useEffect(() => {
		getProducts();
	},[]);

	const [customers, setCustomers] = useState([]);
	const getCustomers = async () => {
		const res = await http.get('/customers');
		// console.log(res.data.customers);
		setCustomers(res.data.customers);
	}

	useEffect(() => {
		getCustomers();
	},[]);
	
	
	const { Option } = Select;

	const [totalAmount, setTotalAmount] = useState(0);
	function onFormChange(value, allValues) {
		console.log(value, allValues);
		const total = allValues?.products?.reduce((accum, item) => {
			if(!item || !item.product) return accum;
			console.log(item);
			const { price } = products.find(p => p._id === item.product);
			return accum += price * (item.quantity || 0);
		}, 0);
		setTotalAmount(total);
	}


	return (
		<>		
			<PageHeader className='site-page-header' 
		    	title='Add order'>
			</PageHeader>
			<Form 
				name='basic'
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
				autoComplete='off'
				onValuesChange={onFormChange}
			>
				
				  <Form.Item
			        label='customer'
			        name='customer'
			        rules={[{ required: true, message: 'Please input customer!' }]}
      			>
        			<Select
					    showSearch
					    style={{ width: 320 }}
					    placeholder='Select a customer'
					    optionFilterProp='children'
					    // onChange={onChange}
					    // onFocus={onFocus}
					    // onBlur={onBlur}
					    // onSearch={onSearch}
					    filterOption={(input, option) =>
					      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					    }
					>

					    {customers.map(customer => (
							<Option key={customer._id} value={customer._id}>{customer.first_name}</Option>
						))}
					
					</Select>
      			</Form.Item>

				  <Form.Item
			        label='status'
			        name='status'
			        rules={[{ required: true, message: 'Please input status!' }]}
      			>
        			<Select
					    showSearch
					    style={{ width: 320 }}
					    placeholder='Select a status'
						optionFilterProp='children'
						// onChange={onChange}
						// onFocus={onFocus}
						// onBlur={onBlur}
						// onSearch={onSearch}
					    filterOption={(input, option) =>
					      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					    }
					>
						{OptionItem.map((item, index) => (
							<Option key={index}
							value={item.value}>
								{item.value}
							</Option>
						))}
						
					</Select>
      			</Form.Item>

				{/* <Form.Item  label="products">
     			    <Input.Group  compact>
       					<Form.Item 
				            name={['address', 'province']}
				            noStyle
				            rules={[{ required: true, message: 'Province is required' }]}
				        >
				           <Select
							    showSearch
							    style={{ width: 300 }}
							    placeholder='Select a product'
							    optionFilterProp='children'
							    onChange={onChange}
							    // onFocus={onFocus}
							    // onBlur={onBlur}
							    // onSearch={onSearch}
							    filterOption={(input, option) =>
							      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							    }
							>

							    {products.map(product => (
									<Option key={product._id} value={product._id}>{product.title}</Option>
								))}
								
							</Select>
			        	</Form.Item>
				        <Form.Item
				            name={['product', 'quantity']}
				            noStyle
				            rules={[{ required: true, message: 'Street is required' }]}
				        >
				            <Input style={{ width: '50%' }} placeholder="Input quantity" />
				        </Form.Item>
		        	</Input.Group>
		      </Form.Item> */}

				{/*  */}
				<Form.List name='products'>
			        {(fields, { add, remove }) => (
			          <>
			            {fields.map(({ key, name, fieldKey, ...restField }) => (
			              <Space key={key} style={{ display: 'flex', marginBottom: 8, marginLeft: 230 }} align='baseline'>
			                <Form.Item
						        label='products'
								name={[name, 'product']}
						        rules={[{ required: true, message: 'Please input product!' }]}
			      			>
			        			<Select
							    showSearch
							    style={{ width: 200 }}
							    placeholder='Select a product'
							    optionFilterProp='children'
							    // onChange={onChange}
							    // onFocus={onFocus}
							    // onBlur={onBlur}
							    // onSearch={onSearch}
							    filterOption={(input, option) =>
							      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							    }
								>

							    {products.map(product => (
									<Option key={product._id} value={product._id}>{product.title}</Option>
								))}
								
								</Select>
			      			</Form.Item>
			                <Form.Item
			                  {...restField}
							//   label='quantity'
							//   name='quantity '
								className='quantity'
								style={{width: 270}}
			                 	name={[name, 'quantity']}
			                 	fieldKey={[fieldKey, 'quantity']}
			                	rules={[{ required: true, message: 'Missing quantity' }]}
			                >
			                  <Input placeholder='Quantity' style={{marginLeft: 5, width: 120}}/>
			                </Form.Item>
			                <MinusCircleOutlined onClick={() => remove(name)} />
			              </Space>
			            ))}
			            <Form.Item>
			              <Button style={{ marginLeft: 320 }} type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
			                Add product
			              </Button>
			            </Form.Item>
			          </>
			        )}
			    </Form.List>
				{/*  */}
				
				  <Form.Item 
				  	
			        label='amount'
			        name='amount'
			        // rules={[{ required: true, message: 'Please input amount!' }]}
      			>
        			{/* <Input readOnly /> */}
					<label>{totalAmount}</label>
      			</Form.Item>
				
				<Form.Item
					wrapperCol={{
					  offset: 8,
					  span: 8,
					}}
				>
					<Button
						type='primary' htmlType='submit'>
					 	Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}