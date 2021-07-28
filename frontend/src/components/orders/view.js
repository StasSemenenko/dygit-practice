import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const OrderView = () => {
	const {id} = useParams();
	const [order, setOrder] = useState([]);
	const getOrder = async () => {
		const res = await http.get('/orders/'+ id );
        const updateOrder = res.data.order.products.map(o => {
			let products = '';
  				products += `${res.data.order.products[0].product} x${res.data.order.products[0].quantity}`;
            return products;
		});
        console.log(updateOrder)
		setOrder(res.data.order);
	}
	useEffect(() => {
		getOrder();
	},[]);

	return (
		<div style={{color: "red"}}>
			<Card title={order.order_number} style={{ width: 300 }}>
				<p>{order._id}</p>
				{/* <p>{order.customer}</p> */}
	      		{/* <p>{order.products}</p> */}
	     		<p>{order.status}</p>
	     		<p>{order.quantity}</p>
	     		<p>{order.amount}</p>
				<p>
				<button><EditOutlined /></button>
				<button><DeleteOutlined /></button>
				</p>
	    	</Card>
		</div>
	)
};
