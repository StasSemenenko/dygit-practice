import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, Pagination} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { listColumns } from '../../constants/customers';

export const CustomersList = () => {
	const [customers, setCustomers] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pages: 1,
		total: 1
	});
	const getCustomers = async (page = 1) => {
		const res = await http.get(`/customers?page=${page}`);
		setCustomers(res.data.customers);
		setPagination({
			page,
			pages: res.data.pages,
			total: res.data.total,
		})
	}
	useEffect(() => {
		getCustomers();
	},[]);

	return (
		<>
			<PageHeader 
		    	className="site-page-header s" 
		    	title="Customers"
		    	// subTitle="This is a subtitle"
	  		>
				<button><Link to='/customers/add'>Add customer</Link></button>
			</PageHeader>
				<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={customers} pagination={false} rowKey='_id'/>
				<Pagination defaultCurrent={1} defaultPageSize={10} total={pagination.total} onChange={(page) => getCustomers(page)}/>
		</>
	)
};
