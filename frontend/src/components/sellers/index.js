import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { listColumns } from '../../constants/sellers';


export const SellersList = () => {
	const [sellers, setSellers] = useState([]);
	const getSellers = async () => {
		// const res = await Axios.post('/auth/signin', {  email: 'stanislavsemenenko@gmail.com', password: '123465' });
		const res = await http.get('/sellers');
		setSellers(res.data.sellers);
	}
	useEffect(() => {
		getSellers();
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
		    	className="site-page-header s" 
		    	title="Sellers"
		    	// subTitle="This is a subtitle"
	  		>
				<button><Link to='/sellers/add'>Add seller</Link></button>
			</PageHeader>
				<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={sellers} rowKey='_id'/>
		</>
	)
};
