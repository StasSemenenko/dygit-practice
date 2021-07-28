import './App.css';
import { BrowserRouter, Switch, Route, Link, } from "react-router-dom";
import { Button, PageHeader} from 'antd';
import classes from './App.css';
import { ProductList} from './components/products';
import { ProductsAdd } from './components/products/add';
import { ProductsEdit } from './components/products/edit';
import { ProductView } from './components/products/view';
import { CustomersList } from './components/customers';
import { CustomersAdd } from './components/customers/add';
import { OrdertList } from './components/orders';
import { OrdersAdd } from './components/orders/add';
import { OrderView } from './components/orders/view';
import { SellerList } from './components/sellers';
import { SellersAdd } from './components/sellers/add';
import { SellersEdit } from './components/sellers/edit';
import { SellerView } from './components/sellers/view';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/sellers">
            <SellerList/>
          </Route>
          <Route exact path="/sellers/add">
            <SellersAdd/>
          </Route>
          <Route exact path="/sellers/edit">
            <SellersEdit/>
          </Route>
          <Route exact path="/sellers/view/:id">
            <SellerView/>
          </Route>
          <Route exact path="/customers">
            <CustomersList/>
          </Route>
          <Route exact path="/customers/add">
            <CustomersAdd/>
          </Route>
          <Route exact path="/products">
            <ProductList/>
          </Route>
          <Route exact path="/products/view/:id">
            <ProductView/>
          </Route>
          <Route exact path="/products/add">
            <div>
            <PageHeader>
              <ProductsAdd/>
              </PageHeader>
            </div>
          </Route>
            <Route exact path="/products/edit">
             <ProductsEdit/>
          </Route>
          <Route exact path="/orders">
            <OrdertList/>
          </Route>
          <Route exact path="/orders/add">
            <div>
            <PageHeader>
              <OrdersAdd/>
              </PageHeader>
            </div>
          </Route>
          <Route exact path="/orders/view/:id">
            <OrderView/>
          </Route>
        </Switch>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
