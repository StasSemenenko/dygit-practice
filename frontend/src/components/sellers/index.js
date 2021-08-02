import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, Pagination} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { listColumns } from '../../constants/sellers';


export const SellersList = () => {
	const [sellers, setSellers] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pages: 1,
		total: 1
	});
	const getSellers = async (page = 1) => {
		const res = await http.get(`/sellers?page=${page}`);
		setSellers(res.data.sellers);
		setPagination({
			page,
			pages: res.data.pages,
			total: res.data.total,
		})
	}

	useEffect(() => {
		getSellers();
	},[]);

	return (
		<>
			<PageHeader
		    	className="site-page-header s" 
		    	title="Sellers"
		    	// subTitle="This is a subtitle"
	  		>
				<button><Link to='/sellers/add'>Add seller</Link></button>
			</PageHeader>
				<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={sellers} pagination={false} rowKey='_id'/>
				<Pagination defaultCurrent={1} defaultPageSize={10} total={pagination.total} onChange={(page) => getSellers(page)}/>
		</>
	)
};
