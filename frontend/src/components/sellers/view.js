import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams, Link, useHistory} from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

export const SellerView = () => {
	const {id} = useParams();
	const history = useHistory();
	const onDelete = async () => {
		await http.delete('/sellers/'+ id);
		history.push('/sellers');
	}
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
			<Card title="Seller" style={{ width: 300, margin: 'auto'}}>
				<p>{seller.first_name}</p>
	      		<p>{seller.last_name}</p>
	     		<p>{seller.shop_name}</p>
	     		<p>{seller.phone_number}</p>
	     		<p>{seller.password}</p>
	     		<p>{seller.email}</p>
				<p>
				<button><Link to={`/sellers/${id}/edit`}><EditOutlined /></Link></button>
				<button onClick={onDelete}><DeleteOutlined /></button>
				</p> 
	    	</Card>
			{/* <h1>Seler view</h1> */}
		</div>
	)
};
