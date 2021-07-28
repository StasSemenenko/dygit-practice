import { Link } from "react-router-dom";
import { Typography } from "antd";

export const listColumns = [
	{
		title: '_id',
	    dataIndex: '_id',
	    key: '_id',
		render: (text, record) => <Link to={'/orders/view/'+record._id}>{text}</Link>,
		sorter: (a, b) => {return a._id.localeCompare(b._id)},
	},
	{
		title: 'order_number',
	    dataIndex: 'order_number',
	    key: 'order_number',
	},
	{
		title: 'customer',
		dataIndex: 'customer',
		key: 'customer',
		sorter: (a, b) => {return a.customer.localeCompare(b.customer)},
	},
	{
		title: 'products',
		dataIndex: 'products',
		key: 'products',
		// sorter: (a, b) => {return a.products.localeCompare(b.products)},
	},
	{
		title: 'status',
		dataIndex: 'status',
		key: 'status',
		sorter: (a, b) => {return a.status.localeCompare(b.status)},
	},
	{
		title: 'amount',
		dataIndex: 'amount',
		key: 'amount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.amount - b.amount,
	},
]; 
// Link