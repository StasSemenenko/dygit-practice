import { Link } from 'react-router-dom';

export const listColumns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    render: (text, record) => <Link to={`/orders/${record._id}`}>{text}</Link>,
    sorter: (a, b) => a._id.localeCompare(b._id),
  },
  {
    title: 'Order number',
    dataIndex: 'order_number',
    key: 'order_number',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    render: (customer, row) => <Link to={`/customer/${customer._id}`}>{customer.first_name}</Link>,
    sorter: (a, b) => a.customer.localeCompare(b.customer),
  },
  {
    title: 'Products',
    dataIndex: 'products',
    key: 'products',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

export const FormItems = [
  {
    label: 'customer',
    name: 'customer',
    errorMessage: 'Please input customer!',
  },
  {
    label: 'products',
    name: 'products',
    errorMessage: 'Please input products!',
  },
  {
    label: 'quantity',
    name: 'quantity',
    errorMessage: 'Please input quantity!',
  },
  {
    label: 'status',
    name: 'status',
    errorMessage: 'Please input status!',
  },
  {
    label: 'amount',
    name: 'amount',
    errorMessage: 'Please input amount!',
  },
];

export const OrderStatusItems = [
	{ value: 'created' },
	{ value: 'processing' },
	{ value: 'shipped' },
	{ value: 'received' },
	{ value: 'cancelled' },
];
