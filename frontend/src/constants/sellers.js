import { Link } from "react-router-dom";

export const listColumns = [
	{
		title: '_id',
		dataIndex: '_id',
		key: '_id',
		render: (text, record) => <Link to={'/sellers/'+record._id}>{text}</Link>,
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

export const FormItems = [
	{
		label: "First name",
		name: "first_name",
		errorMessage: "Please input first name!",
	},
	{
		label: "Last name",
		name: "last_name",
		errorMessage: "Please input last name!",
	},
	{
		label: "Shop name",
		name: "shop_name",
		errorMessage: "Please input shop name!",
	},
	{
		label: "Phone number",
		name: "phone_number",
		errorMessage: "Please input phone number!",
	},
	{
		label: "Password",
		name: "password",
		errorMessage: "Please input password!",
	},
	{
		label: "Email",
		name: "email",
		errorMessage: "Please input email!",
	},
	{
		label: "Logo",
		name: "logo",
		errorMessage: "Please input logo!",
	},
];