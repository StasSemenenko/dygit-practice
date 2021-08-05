import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Button, Pagination } from 'antd';
import http from '../../services/http';
import { listColumns } from '../../constants/orders';

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 1,
  });
  const getOrders = async (page = 1) => {
    const res = await http.get(`/orders?page=${page}`);
    const updateOrders = res.data.orders.map((o) => {
      o.products = o.products.reduce((accum, value) => `${accum}${value.product.title} x${value.quantity}\n`, '');
      return o;
    });
    setOrders(updateOrders);
    setPagination({
      page,
      pages: res.data.pages,
      total: res.data.total,
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header s"
        title="Orders"
        onBack={() => window.history.back()}
      >
        <Button type="primary"><Link to="/orders/add">Add order</Link></Button>
      </PageHeader>
      <Table xs={24} md={{ span: 12, offset: 6 }} columns={listColumns} dataSource={orders} pagination={false} rowKey="_id" />
      <Pagination defaultCurrent={1} defaultPageSize={10} total={pagination.total} onChange={(page) => getOrders(page)} />
    </>
  );
};
