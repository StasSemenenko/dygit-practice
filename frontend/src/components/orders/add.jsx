import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PageHeader, Form, Input, Button, message, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, } from '@ant-design/icons';
import http from '../../services/http';
import { OrderStatusItems } from '../../constants/orders';

export const OrderAdd = () => {
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [customers, setCustomers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [title, setTitle] = useState();

  const onFinish = async (values) => {
    try {
      values.amount = totalAmount;
      if (!id) await http.post('/orders', values);
      else await http.put(`/orders/${id}`, values);
      history.push('/orders');
    } catch (e) {
      const msg = `${e.response.data.error}: ${e.response.data.errors.join(', ')}`;
      message.error(msg);
    }
  };

  const getProducts = async () => {
    const res = await http.get('/products');
    setProducts(res.data.products);
  };

  const getCustomers = async () => {
    const res = await http.get('/customers');
    setCustomers(res.data.customers);
  };

  const getOrder = async () => {
    if (!id) return;
    const res = await http.get(`/orders/${id}`);
    res.data.order.products = res.data.order.products.map((item) => ({
      quantity: item.quantity,
      product: item.product._id,
    }));
    setOrder(res.data.order);
    form.setFieldsValue({
      customer: res.data.order.customer?._id,
      products: res.data.order.products,
      status: res.data.order.status,
      amount: res.data.order.amount,
    });
  };

  useEffect(() => getProducts(), []);
  useEffect(() => getCustomers(), [products]);
  useEffect(() => getOrder(), [customers]);
  useEffect(() => calcAmount(), [order]);

  const { Option } = Select;

  const calcAmount = () => {
    if (!products.length) return;
    const values = form.getFieldsValue();
    const total = values?.products?.reduce((accum, item) => {
      if (!item || !item.product) return accum;
      const { price } = products.find((p) => p._id === item.product);
      return accum += price * (item.quantity || 0);
    }, 0);
    setTotalAmount(total);
  };

  const getTitle = async () => {
    const title = '';
    if (!id) setTitle("Add order");
    else setTitle('Edit order');
  };
  useEffect(() => getTitle(), []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={title}
        onBack={() => window.history.back()}
      />
      <Form
        className="formAddOrder"
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={calcAmount}
      >

        <Form.Item
          label="customer"
          name="customer"
          rules={[{ required: true, message: 'Please input customer!' }]}
        >
          <Select
            showSearch
            style={{ width: 320 }}
            placeholder="Select a customer"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >

            {customers.map((customer) => (
              <Option key={customer._id} value={customer._id}>{customer.first_name}</Option>
            ))}

          </Select>
        </Form.Item>

        <Form.Item
          label="status"
          name="status"
          rules={[{ required: true, message: 'Please input status!' }]}
        >
          <Select
            showSearch
            style={{ width: 320 }}
            placeholder="Select a status"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {OrderStatusItems.map((item, index) => (
              <Option
                key={index}
                value={item.value}
              >
                {item.value}
              </Option>
            ))}

          </Select>
        </Form.Item>

        {/*  */}
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({
                key, name, fieldKey, ...restField
              }) => (
                <Space key={key} style={{ marginBottom: 8, marginLeft: 312 }}
                  align="baseline">
                  <Form.Item
                    label="products"
                    name={[name, 'product']}
                    rules={[{ required: true, message: 'Please input product!' }]}
                  >
                    <Select
                      style={{ width: 253 }}
                      showSearch
                      placeholder="Select a product"
                      optionFilterProp="children"
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >

                      {products.map((product) => (
                        <Option key={product._id} value={product._id}>{product.title}</Option>
                      ))}

                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    style={{ marginLeft: 30 }}
                    name={[name, 'quantity']}
                    fieldKey={[fieldKey, 'quantity']}
                    rules={[{ required: true, message: 'Missing quantity' }]}
                  >
                    <Input placeholder="Quantity" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button style={{ marginLeft: '100%', width: 320, marginTop: 10 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add product
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="amount"
          name="amount"
        >
          <label>{totalAmount}</label>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
