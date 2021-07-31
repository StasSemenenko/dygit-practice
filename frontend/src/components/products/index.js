import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Form, Input, Button, Upload, Pagination} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import http from '../../services/http';
import { listColumns } from '../../constants/products';

const style = {
	input: {marginTop: 10},
	border: {border: '1px solid grey'},
	button: {}
}

export const ProductsList = () => {
	const [products, setProducts] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		pages: 1,
		total: 1
	});
	const getProducts = async (page = 1) => {
		// const res = await Axios.post('/auth/signin', {  email: 'stanislavsemenenko@gmail.com', password: '123465' });
		const res = await http.get(`/products?page=${page}`);
		setProducts(res.data.products);
		setPagination({
			page,
			pages: res.data.pages,
			total: res.data.total,
		})
	}


	useEffect(() => {
		getProducts();
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
	    	title="Products"
			>
				<button><Link to='/products/add'>Add product</Link></button>
		</PageHeader>
		<Table xs ={24} md={{span: 12, offset: 6}} columns={listColumns} dataSource={products} pagination={false} rowKey='_id'/>
			<Pagination defaultCurrent={1} defaultPageSize={10} total={pagination.total} onChange={(page) => getProducts(page)}/>
		</>
	)
};
