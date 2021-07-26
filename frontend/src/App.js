import './App.css';
import { BrowserRouter, Switch, Route, Link, } from "react-router-dom";
import { Button, PageHeader} from 'antd';
import classes from './App.css';
import { ProductList} from './components/products';
import { ProductsAdd } from './components/products/add';
import { ProductsEdit } from './components/products/edit';
import { OrdertList } from './components/orders';
import { OrdersAdd } from './components/orders/add';
import { ProductView } from './components/products/view';
import { SellerList } from './components/sellers';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/customers">
            <SellerList/>
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
        </Switch>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
