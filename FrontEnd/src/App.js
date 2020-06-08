import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
  ;
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
import './theme.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header path /> */}
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/product" component={ProductDetail} />
          </Switch>
        </Router>
      </div>
    );

  }
}

export default App;
