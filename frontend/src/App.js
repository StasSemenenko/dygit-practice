import Router from './Router';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import http from './services/http';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
  const isAuth = !!document.cookie;
  const signout = async() => {
    const res = await http.get('/auth/signout');
    document.cookie = '';
    document.location.pathname = '/auth/signin';
    console.log(res);
  };

  return (
  <div className='App'>
    <Router isAuth={isAuth} history={history} />
  </div>
  )
}
export default App;
