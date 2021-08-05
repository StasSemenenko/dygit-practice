import { Link } from 'react-router-dom';

export const listColumns = [
	{
		title: 'ID',
		dataIndex: '_id',
		key: '_id',
		render: (text, record) => <Link to={`/customers/${record._id}`}>{text}</Link>,
		sorter: (a, b) => a._id.localeCompare(b._id),
	},
	{
		title: 'First name',
		dataIndex: 'first_name',
		key: 'first_name',
		sorter: (a, b) => a.first_name.localeCompare(b.first_name),
	},
	{
		title: 'Last name',
		dataIndex: 'last_name',
		key: 'last_name',
		sorter: (a, b) => a.last_name.localeCompare(b.last_name),
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
		sorter: (a, b) => a.email.localeCompare(b.email),
	},
	{
		title: 'Phone number',
		dataIndex: 'phone_number',
		key: 'phone_number',
	},
	{
		title: 'City',
		dataIndex: 'city',
		key: 'city',
		sorter: (a, b) => a.city.localeCompare(b.city),

	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
		sorter: (a, b) => a.address.localeCompare(b.address),
	},
	{
		title: 'Zip code',
		dataIndex: 'zip_code',
		key: 'zip_code',
		sorter: (a, b) => a.zip_code.localeCompare(b.zip_code),
	},
];

export const FormItems = [
	{
		label: 'First name',
		name: 'first_name',
		errorMessage: 'Please input first name!',
	},
	{
		label: 'Last name',
		name: 'last_name',
		errorMessage: 'Please input last name!',
	},
	{
		label: 'Email',
		name: 'email',
		errorMessage: 'Please input email!',
	},
	{
		label: 'Phone number',
		name: 'phone_number',
		errorMessage: 'Please input phone number!',
	},
	{
		label: 'City',
		name: 'city',
		errorMessage: 'Please input city!',
	},
	{
		label: 'Address',
		name: 'address',
		errorMessage: 'Please input address!',
	},
	{
		label: 'Zip code',
		name: 'zip_code',
		errorMessage: 'Please input zipcode!',
	},
];
