import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const ProductView = () => {
	const {id} = useParams();
	const [product, setProduct] = useState([]);
	const getProduct = async () => {
		const res = await http.get('/products/'+ id );
		setProduct(res.data.product);
	}
	useEffect(() => {
		getProduct();
	},[]);

	return (
		<div style={{color: "red"}}>
			<Card title="title" style={{ width: 300 }}>
				<p>{product.title}</p>
	      		<p>{product.description}</p>
	     		<p>{product.price}</p>
				<p>
				<button><EditOutlined /></button>
				<button><DeleteOutlined /></button>
				</p>
	    	</Card>
		</div>
	)
};
