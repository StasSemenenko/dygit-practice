import { Menu, Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export const CustomHeader = ({ isAuth, logOut }) => (
  <Header>
    <Menu className="menu" theme="dark" mode="horizontal">
      <div className="leftMenuItems">
        <Menu.Item key="8"><Link to="/"><img style={{ width: '4vh', height: '4vh' }} src="/logo512.png" /></Link></Menu.Item>

        <Menu.Item key="1"><Link to="/products">Products</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/customers">Customers</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/orders">Orders</Link></Menu.Item>
      </div>
      {isAuth
        ? (
          <>
            <Menu.Item key="4"><Link to="/profile">Settings</Link></Menu.Item>
            <Menu.Item key="5" onClick={logOut}>Signout</Menu.Item>
          </>
        )
        : (
          <>
            <Menu.Item key="6"><Link to="/auth/signin">Login</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/auth/signup">Registration</Link></Menu.Item>
          </>
        )}
    </Menu>
  </Header>
);
