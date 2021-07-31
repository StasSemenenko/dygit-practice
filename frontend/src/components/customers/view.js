import { useEffect, useState } from 'react';
import http from '../../services/http';
import { useParams, Link, useHistory} from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

export const CustomerView = () => {
	const {id} = useParams();
	const history = useHistory();
	const onDelete = async () => {
		await http.delete('/customers/'+ id);
		history.push('/customers');
	}
	const [customer, setCustomer] = useState([]);
	const getCustomer = async () => {
		const res = await http.get('/customers/'+ id );
		setCustomer(res.data.customer);
	}
	useEffect(() => {
		getCustomer();
	},[]);

	return (
		<>
			{customer ?
				<div style={{color: "red"}}>
					<Card title="Customer" style={{ width: 300, margin: 'auto'}}>
			     		<p>{customer.email}</p>
			     		<p>{customer.phone_number}</p>
			     		<p>{customer.address}</p>
			     		<p>{customer.zip_code}</p>
						<p>
						<button><Link to={`/customers/${id}/edit`}><EditOutlined /></Link></button>
						<button onClick={onDelete}><DeleteOutlined /></button>
						</p>
			    	</Card>
				</div>
			: null}
		</>
	)
};
