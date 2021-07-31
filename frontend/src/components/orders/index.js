import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import http from '../../services/http';
import { listColumns } from '../../constants/orders';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const OrdersList = () => {
	const [orders, setOrders] = useState([]);
	const getOrders = async () => {
		// const r = await http.post('/auth/signin', {  email: 'stanislavsemenenko@gmail.com', password: '123465' });
		const res = await http.get('/orders');
		const updateOrders = res.data.orders.map(o => {
			o.products = o.products.reduce((accum, value) => {
				return accum + `${value.product.title} x${value.quantity}\n`
			},'')

			// console.log(t)
			return o;
		});
		setOrders(updateOrders);
	};
	
	useEffect(() => {
		getOrders();
	},[]);

	return (
		<>
			<PageHeader
	    	className="site-page-header s" style={style.border}
	    	title="Orders"
	    	// subTitle="This is a subtitle"
	  		>
				<button><Link to='/orders/add'>Add order</Link></button>
			</PageHeader>
				<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={orders} rowKey='_id'/>
		</>
	)
};
