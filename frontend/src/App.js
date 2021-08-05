import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Router from './Router';
import http from './services/http';
import { CustomHeader } from './components/shared/header';
import './App.css';

const { Content } = Layout;

const App = () => {
  const isAuth = !!document.cookie;

  const logOut = async () => {
    const res = await http.get('/auth/signout');
    document.cookie = '';
    document.location.pathname = '/auth/signin';
    // history.push('/auth/signin');
    console.log(res);
  };

  return (
    <BrowserRouter>
      <Layout style={{ paddingBottom: 20 }} className="layout">
        <CustomHeader logOut={logOut} isAuth={isAuth} />
        <Content className="content">
          <div className="App">
            <Router isAuth={isAuth} history={history} />
          </div>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
