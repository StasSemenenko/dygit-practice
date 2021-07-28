import { Link } from "react-router-dom";

export const listColumns = [
	{
		title: '_id',
		dataIndex: '_id',
		key: '_id',
		render: (text, record) => <Link to={'/sellers/view/'+record._id}>{text}</Link>,
		sorter: (a, b) => {return a._id.localeCompare(b._id)},
	},
	{	
		title: 'first_name',
	    dataIndex: 'first_name',
	    key: 'first_name',
		sorter: (a, b) => {return a.first_name.localeCompare(b.first_name)},
	},
	{	
		title: 'last_name',
		dataIndex: 'last_name',
		key: 'last_name',
		sorter: (a, b) => {return a.last_name.localeCompare(b.last_name)},
	},
	{
		title: 'shop_name',
		dataIndex: 'shop_name',
		key: 'shop_name',
		sorter: (a, b) => {return a.shop_name.localeCompare(b.shop_name)},
	},
	{
		title: 'phone_number',
		dataIndex: 'phone_number',
		key: 'phone_number',
	},
	{
		title: 'password',
		dataIndex: 'password',
		key: 'password',
	},
	{
		title: 'email',
		dataIndex: 'email',
		key: 'email',
		sorter: (a, b) => {return a.email.localeCompare(b.email)},
	},
	{
		title: 'logo',
		dataIndex: 'logo',
		key: 'logo',
	},
];