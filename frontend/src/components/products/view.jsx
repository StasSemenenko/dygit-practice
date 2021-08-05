import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { fullImagePath } from '../../services/formater';


export const ProductView = () => {
	const { id } = useParams();
	const history = useHistory();
	const onDelete = async () => {
		await http.delete(`/products/${id}`);
		history.push('/products');
	};
	const [product, setProduct] = useState([]);
	const getProduct = async () => {
		const res = await http.get(`/products/${id}`);
		setProduct(res.data.product);
	};
	useEffect(() => {
		getProduct();
	}, []);

	return (
		<>
			{product
				? (
					<div>
						<Card title="Product" style={{ width: '50vh', margin: 'auto' }} cover={
							<img alt="example" src={fullImagePath(product.image)} />}
							actions={[
								<Link to={`/products/${id}/edit`}><EditOutlined key='edit' /></Link>,
								<DeleteOutlined onClick={onDelete} key='delete' />
							]}
						>
							<div className="editItem">
								<p><b>Название:</b></p>
								<p>{product.title}</p>
							</div>
							<div className="editItem">
								<p><b>Описание:</b></p>
								<p>{product.description}</p>
							</div>
							<div className="editItem">
								<p><b>Цена:</b></p>
								<p>{product.price}</p>
							</div>
							<div className="editItem">
								<p><b>Продавец:</b></p>
								<p>{product?.seller?.first_name}</p>
							</div>
						</Card>
					</div>
				)
				: null}
		</>
	);
};
