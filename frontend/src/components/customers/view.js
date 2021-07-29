import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const CustomerView = () => {
	const {id} = useParams();
	const [customer, setCustomer] = useState([]);
	const getCustomer = async () => {
		const res = await http.get('/customers/'+ id );
        const updateCustomer = res.data.order.customers.map(o => {
			let products = '';
  				products += `${res.data.customer.products[0].product} x${res.data.customer.products[0].quantity}`;
            return products;
		});
        console.log(updateCustomer)
		setOrder(res.data.customer);
	}
	useEffect(() => {
		getCustomer();
	},[]);

	return (
		<div style={{color: "red"}}>
			<Card title={customer.first_name} style={{ width: 300 }}>
				<p>{customer._id}</p>
				{/* <p>{order.customer}</p> */}
	      		{/* <p>{order.products}</p> */}
	     		<p>{customer.email}</p>
	     		<p>{customer.phone_number}</p>
	     		<p>{customer.address}</p>
	     		<p>{customer.zip_code}</p>
				<p>
				<button><EditOutlined /></button>
				<button><DeleteOutlined /></button>
				</p>
	    	</Card>
		</div>
	)
};
