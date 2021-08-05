import { BrowserRouter, Switch, Route, Link, } from "react-router-dom";
import { Button, PageHeader, Layout, Menu } from 'antd';

import { ProductsList } from './components/products';
import { ProductAdd } from './components/products/add';
import { ProductEdit } from './components/products/edit';
import { ProductView } from './components/products/view';

import { CustomersList } from './components/customers';
import { CustomerAdd } from './components/customers/add';
import { CustomerEdit } from './components/customers/edit';
import { CustomerView } from './components/customers/view';

import { OrdersList } from './components/orders';
import { OrderAdd } from './components/orders/add';
import { OrderEdit } from './components/orders/edit';
import { OrderView } from './components/orders/view';

import { SellersList } from './components/sellers';
import { SellerAdd } from './components/sellers/add';
import { SellerEdit } from './components/sellers/edit';
import { SellerView } from './components/sellers/view';

import { AuthSignin } from './components/auth/signin';
import { AuthSignup } from './components/auth/signup';

const { Header, Content } = Layout;

const Router = ({ isAuth, history }) => {
  return (
    <Switch>
      <Route exact path="/auth/signin">
        <AuthSignin />
      </Route>
      <Route exact path="/auth/signup">
        <AuthSignup />
      </Route>
      {isAuth ? <Switch>
        <Route exact path="/">
          <ProductsList />
        </Route>

        <Route exact path="/sellers/:id/edit">
          <SellerEdit />
        </Route>

        <Route exact path="/customers">
          <CustomersList />
        </Route>
        <Route exact path="/customers/add">
          <CustomerAdd />
        </Route>
        <Route exact path="/customers/:id/edit">
          <CustomerAdd />
        </Route>
        <Route exact path="/customers/:id">
          <CustomerView />
        </Route>

        <Route exact path="/products">
          <ProductsList />
        </Route>
        <Route exact path="/products/add">
          <ProductAdd />
        </Route>
        <Route exact path="/products/:id/edit">
          <ProductAdd />
        </Route>
        <Route exact path="/products/:id">
          <ProductView />
        </Route>

        <Route exact path="/orders/add">
          <OrderAdd />
        </Route>
        <Route exact path="/orders/:id">
          <OrderView />
        </Route>
        <Route exact path="/orders/:id/edit">
          <OrderAdd />
        </Route>
        <Route exact path="/orders">
          <OrdersList />
        </Route>

      </Switch> : null}
    </Switch>
  )
}

export default Router;