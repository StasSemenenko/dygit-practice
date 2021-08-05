import { Link } from 'react-router-dom';
import { fullImagePath } from '../services/formater';

export const listColumns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
    render: (text, record) => <Link to={`/products/${record._id}`}>{text}</Link>,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    sorter: (a, b) => a.description.localeCompare(b.description),
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (image) => <img className="table-image" src={fullImagePath(image)} />,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
];

export const FormItems = [
  {
    label: 'Title',
    name: 'title',
    errorMessage: 'Please input title!',
  },
  {
    label: 'Description',
    name: 'description',
    errorMessage: 'Please input description!',
  },
  {
    label: 'Price',
    name: 'price',
    errorMessage: 'Please input price!',
  },
];
