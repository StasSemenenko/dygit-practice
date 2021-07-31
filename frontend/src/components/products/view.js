import { useEffect, useState } from 'react';
import { useParams, Link, useHistory} from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import http from '../../services/http';

export const ProductView = () => {
	const {id} = useParams();
	const history = useHistory();
	const onDelete = async () => {
		await http.delete('/products/'+ id);
		history.push('/products');
	}
	const [product, setProduct] = useState([]);
	const getProduct = async () => {
		const res = await http.get('/products/'+ id );
		setProduct(res.data.product);
	}
	useEffect(() => {
		getProduct();
	},[]);

	return (
		<>
			{product ? 
				<div style={{color: "red"}}>
					<Card title="Product" style={{ width: 300, margin: 'auto'}}>
						<p>Название:{product.title}</p>
				  		<p>Описание:{product.description}</p>
				 		<p>Цена:{product.price}</p>
						<p>Продавец:{product?.seller?.first_name}</p>
						<p>
						<button><Link to={`/products/${id}/edit`}><EditOutlined /></Link></button>
						<button onClick={onDelete}><DeleteOutlined /></button>
						</p>
					</Card>
				</div>
			: null}
		</>
	)
};
