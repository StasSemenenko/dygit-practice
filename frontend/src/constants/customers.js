import { Link } from "react-router-dom";

export const listColumns = [
	{
		title: '_id',
		dataIndex: '_id',
		key: '_id',
		render: (text, record) => <Link to={'/customers/'+record._id}>{text}</Link>,
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
		title: 'email',
		dataIndex: 'email',
		key: 'email',
		sorter: (a, b) => {return a.email.localeCompare(b.email)},
	},
	{
		title: 'phone_number',
		dataIndex: 'phone_number',
		key: 'phone_number',
	},
	{
		title: 'city',
		dataIndex: 'city',
		key: 'city',
		sorter: (a, b) => {return a.city.localeCompare(b.city)},

	},
	{
		title: 'address',
		dataIndex: 'address',
		key: 'address',
		sorter: (a, b) => {return a.address.localeCompare(b.address)},
	},
	{
		title: 'zip_code',
		dataIndex: 'zip_code',
		key: 'zip_code',
		sorter: (a, b) => {return a.zip_code.localeCompare(b.zip_code)},
	},
];

export const FormItems = [
	{
		label: "First name",
		name: "first_name",
		errorMessage: "Please input first name!",
	},
	{
		label: "Last name",
		name: "last_name",
		errorMessage: 'Please input last name!',
	},
	{
		label: "Email",
		name: "email",
		errorMessage: 'Please input email!',
	},
	{
		label: "Phone number",
		name: "phone_number",
		errorMessage: 'Please input phone number!',
	},
	{
		label: "City",
		name: "city",
		errorMessage: 'Please input city!',
	},
	{
		label: "Address",
		name: "address",
		errorMessage: 'Please input address!',
	},
	{
		label: "Zip code",
		name: "zip_code",
		errorMessage: 'Please input zipcode!',
	}
];