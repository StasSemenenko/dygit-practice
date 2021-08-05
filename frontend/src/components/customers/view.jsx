import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import http from '../../services/http';

export const CustomerView = () => {
  const { id } = useParams();
  const history = useHistory();
  const onDelete = async () => {
    await http.delete(`/customers/${id}`);
    history.push('/customers');
  };
  const [customer, setCustomer] = useState([]);
  const getCustomer = async () => {
    const res = await http.get(`/customers/${id}`);
    setCustomer(res.data.customer);
  };
  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      {customer
        ? (
          <div style={{}}>
            <Card title="Customer" style={{ width: '50vh', margin: 'auto', textAlign: 'center' }}
              actions={[
                <Link Link to={`/customers/${id}/edit`}><EditOutlined key='edit' /></Link>,
                <DeleteOutlined onClick={onDelete} key='delete' />
              ]}
            >
              <div className="editItem">
                <p><b>Email:</b></p>
                <p>{customer.email}</p>
              </div>
              <div className="editItem">
                <p><b>Номер телефона:</b></p>
                <p>{customer.phone_number}</p>
              </div>
              <div className="editItem">
                <p><b>Адрес:</b></p>
                <p>{customer.address}</p>
              </div>
              <div className="editItem">
                <p><b>Индекс:</b></p>
                <p>{customer.zip_code}</p>
              </div>
            </Card>
          </div>
        )
        : null}
    </>
  );
};
