import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams, Link, useHistory} from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

export const OrderView = () => {
	const {id} = useParams();
	const history = useHistory();
	const onDelete = async () => {
		await http.delete('/orders/'+ id);
		history.push('/orders');
	}
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
				<Card title='Order' style={{ width: 300, margin: 'auto'}}>
					<p>{order._id}</p>
					<p>{order.customer.first_name}</p>
					<p>{order.products}</p>
					<p>{order.status}</p>
					<p>{order.quantity}</p>
					<p>{order.amount}</p>
					<p>
					<button><Link to={`/orders/${id}/edit`}><EditOutlined /></Link></button>
					<button onClick={onDelete}><DeleteOutlined /></button>
					</p>
				</Card>
			</div>
		}
		</>
	)
};
