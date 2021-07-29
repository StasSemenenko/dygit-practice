import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const OrderView = () => {
	const {id} = useParams();
	const [order, setOrder] = useState();
	const getOrder = async () => {
		const res = await http.get('/orders/'+ id );
		res.data.order.products = res.data.order.products.reduce((accum, value) => {
			return accum + `${value.product.title} x${value.quantity}\n`
		},'')
		console.log(res.data.order)
		setOrder(res.data.order);
	}
	useEffect(() => {
		getOrder();
	},[]);

	return (
		<>
		{order && 
			<div style={{color: "red"}}>
				<Card title={order.order_number} style={{ width: 300 }}>
					<p>{order._id}</p>
					<p>{order.customer.first_name}</p>
					<p>{order.products}</p>
					<p>{order.status}</p>
					<p>{order.quantity}</p>
					<p>{order.amount}</p>
					<p>
						<button><EditOutlined /></button>
						<button><DeleteOutlined /></button>
					</p>
				</Card>
			</div>
		}
		</>
	)
};
