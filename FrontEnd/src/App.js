import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
  ;
import Auth from "./components/Auth/Auth";
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Callback from './components/Callback/Callback';
import { AuthService } from "./services/auth-service";
import './theme.css';

// var auth = new AuthService();
// const loginUrl = auth.build_login_link();
// console.log(loginUrl);


class App extends Component {

  // componentDidMount() {
  //   auth.load_jwts();
  //   auth.check_token_fragment();
  // }

  render() {
    return (
      <div className="App">
        <Auth>
          <Router>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/product/:product_id" component={ProductDetail} />
              <Route path="/callback" component={Callback} />

              {/* <Route path='/login' component={() => {
              window.location.href = `${loginUrl}`;
              return null; */}
            }} />
          </Switch>
          </Router>
        </Auth>
      </div>
    );

  }
}

export default App;
