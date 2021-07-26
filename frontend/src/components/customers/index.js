import { listColumns } from '../../constants/customers';
import http from '../../services/http';
import { Table, PageHeader, Form, Input, Button, Upload,} from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const CustomersList = () => {
	const [customers, setCustomers] = useState([]);
	const getCustomers = async () => {
		// const res = await Axios.post('/auth/signin', {  email: 'stanislavsemenenko@gmail.com', password: '123465' });
		const res = await http.get('/customers');
		setCustomers(res.data.customers);
	}
	useEffect(() => {
		getCustomers();
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
	  		>
				<h1>Sellers</h1>
				<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={customers} rowKey='_id'/>
			</PageHeader>
		</>
	)
};
