import { Typography } from "antd";
import { Link } from "react-router-dom";

export const listColumns = [
	{
		title: '_id',
		dataIndex: '_id',
		key: '_id',
		render: (text, record) => <Link to={'/products/view/'+record._id}>{text}</Link>,
		sorter: (a, b) => {return a.title.localeCompare(b.title)},
	},
	{	
		title: 'title',
	    dataIndex: 'title',
	    key: 'title',
		sorter: (a, b) => {return a.title.localeCompare(b.title)},
	},
	{
		title: 'description',
		dataIndex: 'description',
		key: 'description',
		sorter: (a, b) => {return a.description.localeCompare(b.description)},
	},
	{
		title: 'image',
		dataIndex: 'image',
		key: 'image',
	},
	{
		title: 'price',
		dataIndex: 'price',
		key: 'price',
		defaultSortOrder: 'descend',
    	sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'seller',
		dataIndex: 'seller',
		key: 'seller',
		render: record => <Link to={'/sellers/view/'+record._id}> {record.first_name + ' ' + record.last_name} </Link>,
		// render: (text, record) => <Link to={'/seller/view/'+record._id}>{text}</Link>,
		sorter: (a, b) => {return a.seller.localeCompare(b.seller)},
	},
];