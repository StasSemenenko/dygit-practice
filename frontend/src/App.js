import Router from './Router';
import { BrowserRouter, Link, useHistory} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import http from './services/http';
import { CustomHeader } from './components/shared/header';
import './App.css';

const { Header, Content } = Layout;

const App = ( ) => {
  const isAuth = !!document.cookie;

  const logOut = async() => {
    const res = await http.get('/auth/signout');
    document.cookie = '';
    document.location.pathname = '/auth/signin';
    // history.push('/auth/signin');
    console.log(res);
  };

  return (
    <BrowserRouter>
      <Layout style={{ paddingBottom: 20 }} className='layout'>
       <CustomHeader logOut={logOut} isAuth={isAuth}/>
    <Content style={{ padding: '0 50px' }}>
      <div className='App'>
        <Router isAuth={isAuth} history={history} />
      </div>
    </Content>
  </Layout>
  </BrowserRouter>
  )
}
export default App;
