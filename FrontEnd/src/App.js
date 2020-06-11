import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
  ;
import Auth from "./components/Auth/Auth";
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Callback from './components/Callback/Callback';
import './theme.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <Auth>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/product/:product_id" component={ProductDetail} />
              <Route path="/callback" component={Callback} />
              <Route path="/cart" component={Cart} />
            }} />
          </Switch>
          </Router>
        </Auth>
      </div>
    );

  }
}

export default App;
