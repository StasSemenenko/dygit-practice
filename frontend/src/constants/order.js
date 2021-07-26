import { Typography } from "antd";

export const listColumns = [
	{
		title: 'order_number',
	    dataIndex: 'order_number',
	    key: 'order_number',
		render: text => <a>{text}</a>,
		sorter: (a, b) => {return a.title.localeCompare(b.title)},
	},
	{
		title: 'customer',
		dataIndex: 'customer',
		key: 'customer',
		sorter: (a, b) => {return a.description.localeCompare(b.description)},
	},
	{
		title: 'products',
		dataIndex: 'products',
		key: 'products',
		sorter: (a, b) => {return a.products.localeCompare(b.products)},
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