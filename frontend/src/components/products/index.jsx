import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Button, Pagination } from 'antd';
import http from '../../services/http';
import { listColumns } from '../../constants/products';

export const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 1,
  });
  const getProducts = async (page = 1) => {
    const res = await http.get(`/products?page=${page}`);
    setProducts(res.data.products);
    setPagination({
      page,
      pages: res.data.pages,
      total: res.data.total,
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Products"
        onBack={() => window.history.back()}
      >
        <Button type="primary"><Link to="/products/add">Add product</Link></Button>
      </PageHeader>
      <Table xs={24} md={{ span: 12, offset: 6 }} columns={listColumns} dataSource={products} pagination={false} rowKey="_id" />
      <Pagination defaultCurrent={1} defaultPageSize={10} total={pagination.total} onChange={(page) => getProducts(page)} />
    </>
  );
};
