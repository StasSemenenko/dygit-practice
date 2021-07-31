import { Link } from "react-router-dom";
import { Typography } from "antd";

export const listColumns = [
	{
		title: '_id',
	    dataIndex: '_id',
	    key: '_id',
		render: (text, record) => <Link to={'/orders/'+record._id}>{text}</Link>,
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
		render: (customer, row) => <Link to={'/customer/'+customer._id}>{customer.first_name}</Link>,
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

export const FormItems = [
	{
		label: "customer",
		name: "customer",
		errorMessage: "Please input customer!",
	},
	{
		label: "products",
		name: "products",
		errorMessage: 'Please input products!',
	},
	{
		label: "quantity",
		name: "quantity",
		errorMessage: 'Please input quantity!',
	},
	{
		label: "status",
		name: "status",
		errorMessage: 'Please input status!',
	},
	{
		label: "amount",
		name: "amount",
		errorMessage: 'Please input amount!',
	},
];