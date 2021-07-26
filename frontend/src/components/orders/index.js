import { listColumns } from '../../constants/order';
import http from '../../services/http';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { useEffect, useState } from 'react';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const OrdertList = () => {
	const [orders, setOrders] = useState([]);
	const getOrders = async () => {
		const r = await http.post('/auth/signin', {  email: 'stanislavsemenenko@gmail.com', password: '123465' });
		const res = await http.get('/orders');
		const updateOrders = res.data.orders.map(o => {
			let products = '';
			o.products.forEach(p => {
				products += `${p.product} x${p.quantity}\n`;
			});
			o.products = products;
			return o;
		});
		console.log(updateOrders)
		setOrders(updateOrders);
	};
	
	useEffect(() => {
		getOrders();
	},[]);

	// const normFile = (e: any) => {
	// 	console.log('Upload event:', e);
	// 	if (Array.isArray(e)) {
	// 	  return e;
	// 	}
	// 	return e && e.fileList;
	//   };
	return (
		<>
			<PageHeader
	    	className="site-page-header" style={style.border}
	    	onBack={() => null}
	    	title="Title"
	    	// subTitle="This is a subtitle"
	  		>,
				<h1>Orders</h1>
				<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={orders} rowKey='_id'/>
			</PageHeader>
		</>
	)
};
