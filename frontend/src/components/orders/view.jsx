import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import http from '../../services/http';

export const OrderView = () => {
  const { id } = useParams();
  const history = useHistory();
  const onDelete = async () => {
    await http.delete(`/orders/${id}`);
    history.push('/orders');
  };
  const [order, setOrder] = useState();
  const getOrder = async () => {
    const res = await http.get(`/orders/${id}`);
    res.data.order.products = res.data.order.products.reduce((accum, value) => `${accum}${value.product.title} x${value.quantity}\n`, '');
    console.log(res.data.order);
    setOrder(res.data.order);
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {order
        && (
          <div style={{}}>
            <Card title="Order" style={{ width: '50vh', margin: 'auto' }}
              actions={[
                <Link Link to={`/orders/${id}/edit`}><EditOutlined key='edit' /></Link>,
                <DeleteOutlined onClick={onDelete} key='delete' />
              ]}
            >
              <div className="editItem">
                <p><b>Идентификатор:</b></p>
                <p>{order._id}</p>
              </div>
              <div className="editItem">
                <p><b>Клиент:</b></p>
                <p>{order.customer.first_name}</p>
              </div>
              <div className="editItem">
                <p><b>Продукт(ы):</b></p>
                <p>{order.products}</p>
              </div>
              <div className="editItem">
                <p><b>Статус заказа:</b></p>
                <p>{order.status}</p>
              </div>
              <div className="editItem">
                <p><b>Стоимость:</b></p>
                <p>{order.amount}</p>
              </div>
            </Card>
          </div>
        )}
    </>
  );
};
