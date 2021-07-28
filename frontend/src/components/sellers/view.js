import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const SellerView = () => {
	const {id} = useParams();
	const [seller, setSeller] = useState([]);
	const getSeller = async () => {
		const res = await http.get('/sellers/'+ id );
		setSeller(res.data.seller);
	}
	useEffect(() => {
		getSeller();
	},[]);

	return (
		<div style={{color: "red"}}>
			{/* <Card title="title" style={{ width: 300 }}>
				<p>{seller.first_name}</p>
	      		<p>{seller.last_name}</p>
	     		<p>{seller.shop_name}</p>
	     		<p>{seller.phone_number}</p>
	     		<p>{seller.password}</p>
	     		<p>{seller.email}</p>
				<p>
				<button><EditOutlined /></button>
				<button><DeleteOutlined /></button>
				</p> */}
	    	{/* </Card> */}
			<h1>Seler view</h1>
		</div>
	)
};
